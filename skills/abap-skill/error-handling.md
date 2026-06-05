# Clean ABAP — Error Handling

## Messages

### Make Messages Easy to Find

Use this pattern so messages are findable via SE91 where-used search:

```ABAP
" ✓ GOOD
MESSAGE e001(ad) INTO DATA(message).
```

If the variable isn't needed, add the `##NEEDED` pragma:
```ABAP
MESSAGE e001(ad) INTO DATA(message) ##NEEDED.
```

Avoid unreachable code patterns:
```ABAP
" ✗ BAD — unreachable code, tests impossible condition
IF 1 = 2. MESSAGE e001(ad). ENDIF.
```

---

## Return Codes

### Prefer Exceptions to Return Codes

```ABAP
" ✓ GOOD
METHOD try_this_and_that.
  RAISE EXCEPTION NEW cx_failed( ).
ENDMETHOD.

" ✗ BAD
METHOD try_this_and_that.
  error_occurred = abap_true.
ENDMETHOD.
```

**Why exceptions beat return codes:**
- Clean method signatures — `RETURNING` + exceptions, not polluted with error parameters
- Caller doesn't have to react immediately — write the happy path, `CATCH` at the end or outside
- Exceptions carry detail (attributes, methods) — return codes require ad-hoc solutions
- Environment enforces handling — return codes can be accidentally ignored

### Don't Let Failures Slip Through

When you must use return codes (calling older functions), check them explicitly:

```ABAP
DATA:
  current_date TYPE string,
  response     TYPE bapiret2.

CALL FUNCTION 'BAPI_GET_CURRENT_DATE'
  IMPORTING current_date = current_date
  CHANGING  response     = response.

IF response-type = 'E'.
  RAISE EXCEPTION NEW /clean/some_error( ).
ENDIF.
```

---

## Exceptions

### Exceptions Are for Errors, Not for Regular Cases

```ABAP
" ✗ BAD — exception for a valid case
METHODS entry_exists_in_db
  IMPORTING key TYPE char10
  RAISING    cx_not_found_exception.

" ✓ GOOD — return Boolean for valid cases
METHODS entry_exists_in_db
  IMPORTING key           TYPE char10
  RETURNING VALUE(result) TYPE abap_bool.

" ✓ GOOD — exception for actual errors
METHODS assert_user_input_is_valid
  IMPORTING user_input TYPE string
  RAISING  cx_bad_user_input.
```

Misusing exceptions for regular cases misguides readers into thinking something went wrong. Exceptions are also much slower — they need to be constructed and gather context.

### Use Class-Based Exceptions

```ABAP
" ✓ GOOD
TRY.
    get_component_types( ).
  CATCH cx_has_deep_components_error.
ENDTRY.

" ✗ BAD — obsolete non-class-based
get_component_types(
  EXCEPTIONS
    has_deep_components = 1
    OTHERS              = 2 ).
```

---

## Throwing Exceptions

### Use Own Super Classes

Create abstract super classes for each exception type:

```ABAP
CLASS cx_fra_static_check DEFINITION ABSTRACT INHERITING FROM cx_static_check.
CLASS cx_fra_no_check DEFINITION ABSTRACT INHERITING FROM cx_no_check.
```

Benefits:
- `CATCH` all _your_ exceptions in one block
- Add common functionality to all exceptions (special text handling)
- `ABSTRACT` prevents using these non-descriptive errors directly

### Throw One Type of Exception

```ABAP
" ✓ GOOD
METHODS generate
  RAISING cx_generation_error.

" ✗ BAD — multiple types, caller usually handles them identically
METHODS generate
  RAISING
    cx_abap_generation
    cx_hdbr_access_error
    cx_model_read_error.
```

Use sub-classes to allow (but not require) distinguishing error situations.

### Use Sub-Classes to Distinguish Error Situations

Create sub-classes of your main exception for cases where callers _might_ need to differentiate. Callers who don't care still catch the superclass.

### Throw CX_STATIC_CHECK for Manageable Exceptions

Use `CX_STATIC_CHECK` (checked exception) when:
- The caller can meaningfully handle the error
- You want the compiler to enforce handling (syntax check reminds caller)

```ABAP
METHODS read_data
  IMPORTING key   TYPE char10
  RAISING  cx_data_not_found.
```

Most business exceptions fall here.

### Throw CX_NO_CHECK for Unrecoverable Situations

Use `CX_NO_CHECK` (unchecked exception) when:
- The error is usually unrecoverable
- You don't want to force every caller to handle it
- Example: programming errors, configuration failures, fatal infrastructure errors

```ABAP
RAISE EXCEPTION TYPE cx_configuration_error.
```

### Consider CX_DYNAMIC_CHECK for Avoidable Exceptions

Use `CX_DYNAMIC_CHECK` when the caller _can_ check preconditions to avoid the exception. The compiler doesn't force handling — it's the caller's responsibility to guard.

**Decision guide:**

| Scenario | Use |
|---|---|
| Caller can fix the problem meaningfully | `CX_STATIC_CHECK` |
| Caller can prevent by checking first | `CX_DYNAMIC_CHECK` |
| Usually unrecoverable, shouldn't force handling | `CX_NO_CHECK` |
| Totally unrecoverable, should never happen | `MESSAGE ... TYPE 'X'` (dump) |

### Dump for Totally Unrecoverable Situations

If the error means the program absolutely cannot continue (data corruption, impossible state), dump:

```ABAP
MESSAGE 'Database corrupted: missing root entry' TYPE 'X'.
```

### Prefer RAISE EXCEPTION NEW to RAISE EXCEPTION TYPE

```ABAP
" ✓ GOOD — creates and raises in one step
RAISE EXCEPTION NEW cx_error( textid = ... previous = ... ).

" ✗ BAD — needless two-step
RAISE EXCEPTION TYPE cx_error
  EXPORTING textid = ... previous = ...
```

---

## Catching Exceptions

### Wrap Foreign Exceptions Instead of Letting Them Invade

When calling foreign code (other components, BAPIs, third-party), catch their exceptions and wrap them in your own:

```ABAP
" ✓ GOOD
METHOD process_order.
  TRY.
      call_bapi( order ).
    CATCH cx_bapi_error INTO DATA(bapi_error).
      RAISE EXCEPTION NEW cx_order_processing_failed(
        previous = bapi_error
        order_id = order->id ).
  ENDTRY.
ENDMETHOD.

" ✗ BAD — foreign exception leaks through your API
METHOD process_order RAISING cx_bapi_error.
  call_bapi( order ).
ENDMETHOD.
```

This keeps your API independent of external implementations and provides context (e.g., the `order_id` that failed).
