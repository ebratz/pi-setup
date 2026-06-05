# Clean ABAP — Methods

## Method Calls

### Don't Call Static Methods Through Instance Variables

```ABAP
" ✓ GOOD — qualified with class name
cl_my_class=>static_method( ).

" ✗ BAD — through instance, confusing
lo_my_instance->static_method( ).
```

Within an instance method, still qualify static calls with the class name:
```ABAP
METHOD instance_method.
  cl_my_class=>a_static_method( ).
  another_instance_method( ).
ENDMETHOD.
```

### Don't Access Types Through Instance Variables

Access type definitions via the class/interface, not via an instance:

```ABAP
" ✓ GOOD
INTERFACE lif.
  TYPES blah TYPE lcl=>foo.
ENDINTERFACE.

" ✗ BAD — suggests instance-specific type
DATA(ref) = NEW lcl( ).
TYPES blah TYPE ref->foo.
```

### Prefer Functional to Procedural Calls

```ABAP
" ✓ GOOD — functional, compact
modify->update( node           = /clean/my_bo_c=>node-item
                key            = item->key
                data           = item
                changed_fields = changed_fields ).

" ✗ BAD — procedural, verbose
CALL METHOD modify->update
  EXPORTING
    node           = /dirty/my_bo_c=>node-item
    key            = item->key
    data           = item
    changed_fields = changed_fields.
```

If dynamic typing forbids functional calls, resort to procedural style:
```ABAP
CALL METHOD modify->(method_name)
  EXPORTING node = ... key = ... data = ... changed_fields = ...
```

### Omit RECEIVING

```ABAP
" ✓ GOOD
DATA(sum) = aggregate_values( values ).

" ✗ BAD
aggregate_values( EXPORTING values = values RECEIVING result = DATA(sum) ).
```

### Omit the Optional Keyword EXPORTING

```ABAP
" ✓ GOOD
modify->update( node = ... key = ... data = ... changed_fields = ... ).
```

### Omit Parameter Name in Single Parameter Calls

```ABAP
" ✓ GOOD
DATA(unique_list) = remove_duplicates( list ).

" Exception — when method name alone isn't clear enough:
car->drive( speed = 50 ).
update( asynchronous = abap_true ).
```

### Omit Self-Reference `me->` When Calling Instance Members

```ABAP
" ✓ GOOD — me-> is implicit
DATA(sum) = aggregate_values( values ).

" ✗ BAD
DATA(sum) = aggregate_values( me->values ).
DATA(sum) = me->aggregate_values( values ).
```

Only use `me->` when there's a scope conflict between a local variable/parameter and an instance attribute:
```ABAP
me->logger = logger.
```

---

## Object Orientation

### Prefer Instance Methods to Static Methods

Instance methods better reflect "object-hood" and can be mocked in unit tests. Static methods only in exceptional cases like static creation methods:

```ABAP
" ✓ GOOD — instance (default)
METHODS publish.

" ✓ GOOD — static creation (exception)
CLASS-METHODS create_instance RETURNING VALUE(result) TYPE REF TO /clean/blog_post.
```

### Public Instance Methods Should Be Part of an Interface

```ABAP
METHOD /clean/blog_post~publish.
```

This decouples dependencies and simplifies mocking. Having a public method without an interface rarely makes sense — exceptions include enumeration classes (never alternative implementations, never mocked).

---

## Parameter Number

### Aim for Few IMPORTING Parameters (<3)

Too many parameters indicate the method may do more than one thing. Combine parameters into meaningful structures and objects.

```ABAP
" ✓ GOOD — grouped into config structure
FUNCTION seo_class_copy
  IMPORTING
    clskey      TYPE seoclskey
    new_clskey  TYPE seoclskey
    config      TYPE class_copy_config.

" ✗ BAD — 10 parameters, exponential complexity
FUNCTION seo_class_copy
  IMPORTING
    clskey                 TYPE seoclskey
    new_clskey             TYPE seoclskey
    access_permission      TYPE seox_boolean DEFAULT seox_true
    save                   TYPE seox_boolean DEFAULT seox_true
    suppress_corr          TYPE seox_boolean DEFAULT seox_false
    suppress_dialog        TYPE seox_boolean DEFAULT seox_false
    authority_check        TYPE seox_boolean DEFAULT seox_true
    lifecycle_manager      TYPE REF TO if_adt_lifecycle_manager OPTIONAL
    lock_handle            TYPE REF TO if_adt_lock_handle OPTIONAL
    suppress_commit        TYPE seox_boolean DEFAULT seox_false.
```

### Split Methods Instead of Adding OPTIONAL Parameters

ABAP doesn't support overloading. Use multiple named methods:

```ABAP
" ✓ GOOD
METHODS do_one_thing IMPORTING what_i_need TYPE string.
METHODS do_another_thing IMPORTING something_else TYPE i.

" ✗ BAD
METHODS do_it_all
  IMPORTING
    what_i_need    TYPE string OPTIONAL
    something_else TYPE i      OPTIONAL.
```

### Use PREFERRED PARAMETER Sparingly

The `PREFERRED PARAMETER` addition makes the parameter optional while telling the syntax check to suggest it. Use it rarely — it often obscures intent better handled by separate methods.

### RETURN, EXPORT, or CHANGE Exactly One Parameter

Methods should return exactly one thing. Return it via `RETURNING`, or if that's not possible, `EXPORTING` exactly one parameter.

---

## Parameter Types

### Prefer RETURNING to EXPORTING

```ABAP
" ✓ GOOD
METHODS get_name RETURNING VALUE(result) TYPE string.

" ✗ BAD
METHODS get_name EXPORTING name TYPE string.
```

`RETURNING` makes the data flow clear at the call site: `DATA(name) = obj->get_name( )`.

### RETURNING Large Tables Is Usually Okay

ABAP uses pass-by-reference for large tables internally. Returning them doesn't cause memory issues.

### Use Either RETURNING or EXPORTING or CHANGING — Not a Combination

Choose one output style per method. Mixing them confuses the reader.

### Use CHANGING Sparingly

`CHANGING` indicates the method modifies the input. Use only where this behavior is explicit and intentional (e.g., `reduce_day_by_one( CHANGING date = date )`). Prefer `RETURNING` for new values.

### Split Method Instead of Boolean Input Parameter

```ABAP
" ✓ GOOD
METHODS do_something.
METHODS do_something_else.

" ✗ BAD — "flag argument" anti-pattern
METHODS do_something IMPORTING special_mode TYPE abap_bool.
```

Boolean parameters indicate the method does at least two things. Split into separate methods.

---

## Method Body

### Do One Thing, Do It Well, Do It Only

A method should have exactly one responsibility. If you describe it with "and", split it.

### Focus on the Happy Path or Error Handling — Not Both

```ABAP
" ✓ GOOD — happy path only, errors through exceptions
METHOD process.
  validate_input( ).
  DATA(result) = do_processing( ).
  save( result ).
ENDMETHOD.

" ✗ BAD — interleaved error checking
METHOD process.
  IF input IS INITIAL. RETURN. ENDIF.
  DATA(result) = do_processing( ).
  IF result IS INITIAL. RETURN. ENDIF.
  save( result ).
ENDMETHOD.
```

### Descend One Level of Abstraction

Statements within a method should all be at the same level of abstraction. High-level orchestration shouldn't mix with low-level data manipulation.

### Keep Methods Small

Aim for 3-5 statements. A method longer than 20 lines should be rare.

---

## Control Flow in Methods

### Fail Fast

Check preconditions at the beginning. Return or raise exceptions immediately if something is wrong:

```ABAP
" ✓ GOOD
METHOD process.
  IF input IS INITIAL.
    RETURN.
  ENDIF.
  " ... main logic ...
ENDMETHOD.
```

### CHECK vs. RETURN

```ABAP
" ✓ GOOD — CHECK for early exit in loops
LOOP AT table REFERENCE INTO DATA(line).
  CHECK line->is_valid( ).
  " ... process valid lines ...
ENDLOOP.

" ✓ GOOD — RETURN for early exit from methods
METHOD do_something.
  IF input IS INITIAL.
    RETURN.
  ENDIF.
  " ... main logic ...
ENDMETHOD.
```

`CHECK` outside of loops (`CHECK` after `ENDLOOP`) exits the current processing block entirely — prefer `RETURN` in methods for clarity.

### Avoid CHECK in Non-Loop Positions

`CHECK` outside loops, inside methods, exits the method — but expresses the intent less clearly than `RETURN`.
