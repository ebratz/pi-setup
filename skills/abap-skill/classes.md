# Clean ABAP — Classes

## Object Orientation

### Prefer Objects to Static Classes

Static classes give up all advantages of object orientation — especially replacing dependencies with test doubles in unit tests. If you think about making a class static, the answer is nearly always: no.

**One accepted exception:** Plain type utility classes. They're so basic they look like ABAP statements or built-in functions, and consumers don't want to mock them:

```ABAP
CLASS /clean/string_utils DEFINITION [...].
  CLASS-METHODS trim
   IMPORTING string TYPE string
   RETURNING VALUE(result) TYPE string.
ENDCLASS.

METHOD retrieve.
  DATA(trimmed_name) = /clean/string_utils=>trim( name ).
  result = read( trimmed_name ).
ENDMETHOD.
```

### Prefer Composition to Inheritance

Avoid building inheritance hierarchies. Favor composition instead.

**Inheritance problems:**
- Hard to design (Liskov substitution principle)
- Hard to understand (need to grok the hierarchy's principles)
- Reduces reuse (methods locked to sub-classes)
- Complicates refactoring (changes ripple through the hierarchy)

**Composition:** Design small, independent objects each serving one specific purpose. Recombine via delegation and facade patterns. May produce more classes but has no other disadvantages.

Good inheritance applications exist (Composite pattern, Business Add-Ins), but _ask critically_ whether inheritance provides more benefit than disadvantage. **If in doubt, composition is the safer choice.**

### Don't Mix Stateful and Stateless in the Same Class

**Stateless** — methods produce output from input, no side effects, same result regardless of call order:
```ABAP
CLASS /clean/xml_converter DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    METHODS convert
      IMPORTING file_content  TYPE xstring
      RETURNING VALUE(result) TYPE /clean/some_inbound_message.
ENDCLASS.
```

**Stateful** — methods manipulate internal object state (full of side effects):
```ABAP
CLASS /clean/log DEFINITION PUBLIC CREATE PUBLIC.
  PUBLIC SECTION.
    METHODS add_message IMPORTING message TYPE /clean/message.
  PRIVATE SECTION.
    DATA messages TYPE /clean/message_table.
ENDCLASS.
```

Mixing both paradigms produces code that's hard to understand and sure to fail with obscure carry-over errors. Don't do that.

---

## Scope

### Global by Default, Local Only Where Appropriate

Work with global classes as default. Use local classes only when appropriate:
- Very specific private data structures (e.g., an iterator only used here)
- Extracting a complex private algorithm
- Enabling mocking of the global class (e.g., extracting DB access to a local class replaced by a test double)

**Reconsider local classes if:**
- The local include spans dozens of classes and thousands of lines
- You think of global classes as "packages" holding other classes
- Global classes degenerate into empty hulls
- Duplicate code repeats across separate local includes
- Developers lock each other out and can't work in parallel

### FINAL If Not Designed for Inheritance

Make classes `FINAL` unless explicitly designed for inheritance:

```ABAP
CLASS /clean/my_class DEFINITION PUBLIC FINAL CREATE PUBLIC.
```

Enabling inheritance requires thinking about `PROTECTED` vs `PRIVATE`, the Liskov substitution principle, and freezes design internals. If you didn't design for it, prevent accidental inheritance.

**Exception:** Unclean classes that don't implement interfaces should be left non-`FINAL` to allow consumers to mock them in unit tests.

### Members PRIVATE by Default, PROTECTED Only If Needed

```ABAP
CLASS /clean/example DEFINITION.
  PRIVATE SECTION.    " ← default for all members
  PROTECTED SECTION.  " ← only if sub-classes need to override
  PUBLIC SECTION.     " ← only what the outside world needs
ENDCLASS.
```

Over-available internals cause subtle errors from unexpected redefinitions and hinder refactoring.

### Consider Immutable Objects Instead of Getters

For objects that never change after construction, use public read-only attributes instead of getters:

```ABAP
" ✓ GOOD — immutable data container
CLASS /clean/some_data_container DEFINITION.
  PUBLIC SECTION.
    METHODS constructor IMPORTING a TYPE i b TYPE c c TYPE d.
    DATA a TYPE i READ-ONLY.
    DATA b TYPE c READ-ONLY.
    DATA c TYPE d READ-ONLY.
ENDCLASS.

" ✗ BAD — unnecessary getter boilerplate
CLASS /dirty/some_data_container DEFINITION.
  PUBLIC SECTION.
    METHODS get_a ...
    METHODS get_b ...
    METHODS get_c ...
  PRIVATE SECTION.
    DATA a TYPE i.
    DATA b TYPE c.
    DATA c TYPE d.
ENDCLASS.
```

**Caution:** Don't use public read-only attributes for objects that DO change — the attributes must always be kept up to date.

### Use READ-ONLY Sparingly

ABAP's `READ-ONLY` differs from other languages:
- Only available in `PUBLIC SECTION` (not protected, private, or local variables)
- Data can still be modified freely from within the class itself, friends, and sub-classes
- This contradicts the write-once-modify-never behavior in other languages

---

## Constructors

### Prefer NEW to CREATE OBJECT

```ABAP
" ✓ GOOD
DATA(object) = NEW /clean/some_number_range( '/CLEAN/CXTGEN' ).
DATA(object) = CAST /clean/number_range( NEW /clean/some_number_range( ... ) ).

" ✗ BAD — needlessly long
DATA object TYPE REF TO /dirty/some_number_range.
CREATE OBJECT object EXPORTING number_range = '/DIRTY/CXTGEN'.
```

Exception: when you need dynamic types:
```ABAP
CREATE OBJECT number_range TYPE (dynamic_type) EXPORTING number_range = '/CLEAN/CXTGEN'.
```

### If CREATE PRIVATE, Leave Constructor Public

For global classes marked `CREATE PRIVATE`, the constructor must remain in the `PUBLIC SECTION` to guarantee correct compilation and syntax validation (per SAP documentation). For local classes, make the constructor private as it should be.

### Prefer Multiple Static Creation Methods to Optional Parameters

ABAP doesn't support overloading. Use name variations, not optional parameters:

```ABAP
" ✓ GOOD — named creation methods
CLASS-METHODS describe_by_data IMPORTING data TYPE any [...]
CLASS-METHODS describe_by_name IMPORTING name TYPE any [...]
CLASS-METHODS describe_by_object_ref IMPORTING object_ref TYPE REF TO object [...]
CLASS-METHODS describe_by_data_ref IMPORTING data_ref TYPE REF TO data [...]

" ✗ BAD — optional parameter soup
METHODS constructor
  IMPORTING
    data       TYPE any OPTIONAL
    name       TYPE any OPTIONAL
    object_ref TYPE REF TO object OPTIONAL
    data_ref   TYPE REF TO data OPTIONAL [...]
```

Good prefixes: `new_`, `create_`, `construct_`. Add up to verb phrases: `new_from_template`, `create_as_copy`, `create_by_name`.

### Make Singletons Only Where Multiple Instances Don't Make Sense

```ABAP
METHOD new.
  IF singleton IS NOT BOUND.
    singleton = NEW /clean/my_class( ).
  ENDIF.
  result = singleton.
ENDMETHOD.
```

Use the singleton pattern only when OO design says a second instance doesn't make sense (same state, same data for all consumers). Don't use it out of habit or for performance — it's the most overused and wrongly applied pattern, producing unexpected cross-effects and complicating testing.
