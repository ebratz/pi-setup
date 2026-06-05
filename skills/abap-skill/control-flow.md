# Clean ABAP — Control Flow

## Conditions

### Try to Make Conditions Positive

```ABAP
" ✓ GOOD
IF has_entries = abap_true.

" ✗ BAD — harder mental turnaround
IF has_no_entries = abap_false.
```

Don't force this up to empty IF branches:
```ABAP
" ✗ BAD
IF has_entries = abap_true.
ELSE.
  " only the ELSE block does something
ENDIF.
```

### Prefer IS NOT to NOT IS

```ABAP
" ✓ GOOD
IF variable IS NOT INITIAL.
IF variable NP 'TODO*'.
IF variable <> 42.

" ✗ BAD — NOT requires mental reversal
IF NOT variable IS INITIAL.
IF NOT variable CP 'TODO*'.
IF NOT variable = 42.
```

### Consider Predicative Method Calls for Boolean Methods

```ABAP
" ✓ GOOD — compact, reads like natural language
IF [ NOT ] condition_is_fulfilled( ).

" ✗ BAD — verbose comparison
IF condition_is_fulfilled( ) = abap_true.
```

> Predicative method call `meth( )` is short for `meth( ) IS NOT INITIAL`. Only use for methods where non-initial = "true" and initial = "false".

### Decompose Complex Conditions

Break complex conditions into named intermediate Booleans:

```ABAP
" ✓ GOOD — decomposed
DATA(example_provided) = xsdbool( example_a IS NOT INITIAL OR
                                  example_b IS NOT INITIAL ).
DATA(one_example_fits) = xsdbool( applies( example_a ) = abap_true OR
                                  applies( example_b ) = abap_true OR
                                  fits( example_b ) = abap_true ).
IF example_provided = abap_true AND
   one_example_fits = abap_true.

" ✗ BAD — all in one condition
IF ( example_a IS NOT INITIAL OR
     example_b IS NOT INITIAL ) AND
   ( applies( example_a ) = abap_true OR
     applies( example_b ) = abap_true OR
     fits( example_b ) = abap_true ).
```

### Extract Complex Conditions to Methods

```ABAP
" ✓ GOOD
IF is_provided( example ).

METHOD is_provided.
  DATA(is_filled) = xsdbool( example IS NOT INITIAL ).
  DATA(is_working) = xsdbool( applies( example ) = abap_true OR
                              fits( example ) = abap_true ).
  result = xsdbool( is_filled = abap_true AND
                    is_working = abap_true ).
ENDMETHOD.
```

---

## If Statements

### No Empty IF Branches

```ABAP
" ✓ GOOD
IF has_entries = abap_false.
  " do some magic
ENDIF.

" ✗ BAD
IF has_entries = abap_true.
ELSE.
  " do some magic
ENDIF.
```

### Prefer CASE to ELSE IF

```ABAP
" ✓ GOOD — explicit, fast, easy to extend
CASE type.
  WHEN type-some_type.
    " ...
  WHEN type-some_other_type.
    " ...
  WHEN OTHERS.
    RAISE EXCEPTION NEW /clean/unknown_type_failure( ).
ENDCASE.

" ✗ BAD — harder to read, easier to mis-nest
IF type = type-some_type.
  " ...
ELSEIF type = type-some_other_type.
  " ...
ELSE.
  RAISE EXCEPTION NEW /dirty/unknown_type_failure( ).
ENDIF.
```

`CASE` advantages:
- Makes mutually exclusive alternatives obvious
- Can be faster (different microprocessor command)
- Easy to add new cases without repeating the variable
- Prevents errors from accidental IF-ELSEIF nesting

### Keep Nesting Depth Low

```ABAP
" ✗ BAD — exponential test cases needed
IF <this>.
  IF <that>.
  ENDIF.
ELSE.
  IF <other>.
  ELSE.
    IF <something>.
    ENDIF.
  ENDIF.
ENDIF.
```

**Fixes:**
- Merge conditions: `IF <this> AND <that>` instead of nested `IF <this>. IF <that>.`
- Extract sub-methods
- Introduce Boolean helper variables

---

## Regular Expressions

### Prefer Simpler Methods to Regular Expressions

```ABAP
" ✓ GOOD — obvious
IF input IS NOT INITIAL.

" Overkill — simple cases don't need regex
IF matches( val = input  regex = '.+' ).

" ✓ GOOD — simple string ops
WHILE contains( val = input  sub = 'abc' ).

" Overkill
WHILE contains( val = input  regex = 'abc' ).
```

Regular expressions are harder to understand, consume more memory and processing time (parsed into expression trees, compiled at runtime).

### Prefer Basis Checks to Regular Expressions

Don't reinvent validation that ABAP already provides:

```ABAP
" ✓ GOOD — use existing function
CALL FUNCTION 'SEO_CLIF_CHECK_NAME'
  EXPORTING
    cls_name = class_name
  EXCEPTIONS
    ...

" ✗ BAD — reimplementing validation with regex
DATA(is_valid) = matches( val     = class_name
                          pattern = '[A-Z][A-Z0-9_]{0,29}' ).
```

### Assemble Complex Regular Expressions

When regex is unavoidable, build from elementary pieces:

```ABAP
CONSTANTS class_name TYPE string VALUE `CL\_.*`.
CONSTANTS interface_name TYPE string VALUE `IF\_.*`.
DATA(object_name) = |{ class_name }\|{ interface_name }|.
```
