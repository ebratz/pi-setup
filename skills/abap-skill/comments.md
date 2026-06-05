# Clean ABAP — Comments

## Express Yourself in Code, Not in Comments

Clean Code doesn't forbid comments — it encourages you to exploit better means, and only resort to comments if that fails.

```ABAP
" ✓ GOOD — code IS the explanation
METHOD correct_day_to_last_in_month.
  WHILE is_invalid( date ).
    reduce_day_by_one( CHANGING date = date ).
  ENDWHILE.
ENDMETHOD.

METHOD is_invalid.
  DATA zero_if_invalid TYPE i.
  zero_if_invalid = date.
  result = xsdbool( zero_if_invalid = 0 ).
ENDMETHOD.

METHOD reduce_day_by_one.
  date+6(2) = date+6(2) - 1.
ENDMETHOD.
```

The above replaces a 10-line method full of comments explaining _what_ the code does.

## Comments Are No Excuse for Bad Names

Improve your names instead of explaining them:

```ABAP
" ✓ GOOD
DATA(input_has_entries) = has_entries( input ).

" ✗ BAD
" checks whether the table input contains entries
DATA(result) = check_table( input ).
```

## Use Methods Instead of Comments to Segment Code

```ABAP
" ✓ GOOD — named methods express intent and structure
DATA(statement) = build_statement( ).
DATA(data) = execute_statement( statement ).

" ✗ BAD — comment-separated sections
" -----------------
" Build statement
" -----------------
DATA statement TYPE string.
statement = |SELECT * FROM d_document_roots|.

" -----------------
" Execute statement
" -----------------
DATA(result_set) = adbc->execute_sql_query( statement ).
result_set->next_package( IMPORTING data = data ).
```

This also avoids carry-over errors when temporary variables aren't properly cleared between sections.

## Write Comments to Explain the WHY, Not the WHAT

```ABAP
" ✓ GOOD — explains the reasoning
" can't fail, existence of >= 1 row asserted above
DATA(first_line) = table[ 1 ].

" ✗ BAD — repeats the code in natural language
" select alert root from database by key
SELECT * FROM d_alert_root WHERE key = key.
```

## Design Goes Into Design Documents, Not the Code

Nobody reads multi-paragraph design explanations embedded in code comments. If your code needs a textbook to use, that signals severe design issues. Link the design document instead.

## Comment with `"`, Not with `*`

Quote comments indent along with the statements they comment:

```ABAP
" ✓ GOOD
METHOD do_it.
  IF input IS NOT INITIAL.
    " delegate pattern
    output = calculate_result( input ).
  ENDIF.
ENDMETHOD.

" ✗ BAD — asterisk comments indent weirdly
METHOD do_it.
  IF input IS NOT INITIAL.
* delegate pattern
    output = calculate_result( input ).
  ENDIF.
ENDMETHOD.
```

## Put Comments Before the Statement They Relate To

```ABAP
" ✓ GOOD
" delegate pattern
output = calculate_result( input ).

" ✗ BAD
output = calculate_result( input ).  " delegate pattern
```

## Delete Code Instead of Commenting It

```ABAP
" ✗ BAD — commented-out code rots and confuses
" IF old_condition = abap_true.
"   do_old_thing( ).
" ENDIF.
```

Version control remembers deleted code. Commented-out code only confuses readers about whether it's temporarily disabled, deprecated, or left over.

## Don't Do Manual Versioning

```ABAP
" ✗ BAD — version control handles this
" 2023-01-15: Added new validation
" 2022-06-01: Fixed bug with empty input
" Author: DEVELOPER1
```

## Use FIXME, TODO, and XXX with Your ID

```ABAP
" TODO(DEVELOPER1): Replace with BAPI when available in next release
CALL FUNCTION 'Z_OLD_FUNCTION'.
```

## Don't Add Method Signature and End-Of Comments

```ABAP
" ✗ BAD — IDE already shows this
METHOD do_something.  " ← redundant
  " ...
ENDMETHOD.            " do_something ← redundant
```

## Don't Duplicate Message Texts as Comments

```ABAP
" ✗ BAD — already visible in the MESSAGE statement
" Order has been saved
MESSAGE 'Order has been saved' TYPE 'S'.
```

## ABAP Doc Only for Public APIs

Use ABAP Doc (`"!`) for public APIs — it generates documentation and is visible in ADT. Don't use it for private/internal methods unless they're complex enough to warrant it.

```ABAP
"! <p class="shorttext synchronized">Validates the business partner data</p>
"! @parameter business_partner | The business partner to validate
"! @parameter result | ABAP_TRUE if valid
"! @raising cx_validation_error | If validation fails
METHODS validate
  IMPORTING business_partner TYPE /clean/business_partner
  RETURNING VALUE(result)    TYPE abap_bool
  RAISING   cx_validation_error.
```

## Prefer Pragmas to Pseudo Comments

Use ABAP pragmas (`##`) instead of pseudo comments (`#EC`):

```ABAP
" ✓ GOOD — modern pragma
DATA(name) = 'test' ##NEEDED.

" ✗ BAD — old pseudo comment
DATA name TYPE string. "#EC NEEDED
```
