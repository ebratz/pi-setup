# Clean ABAP — Testing

## Principles

### Write Testable Code

Design code to be testable from the start:
- Depend on interfaces, not concrete implementations
- Use dependency injection for external dependencies
- Keep methods small with single responsibilities
- Avoid static methods that can't be mocked
- Separate business logic from infrastructure (DB, HTTP, file I/O)

### Enable Others to Mock You

```ABAP
" ✓ GOOD — depends on interface, easy to mock
CLASS /clean/order_processor DEFINITION.
  PUBLIC SECTION.
    METHODS constructor IMPORTING logger TYPE REF TO /clean/if_log.
    METHODS process IMPORTING order TYPE /clean/order.
ENDCLASS.

" ✗ BAD — hard-coded dependency, can't mock
CLASS /dirty/order_processor DEFINITION.
  PUBLIC SECTION.
    METHODS process IMPORTING order TYPE /dirty/order.
  PRIVATE SECTION.
    DATA logger TYPE REF TO /dirty/log.  " concrete dependency
ENDCLASS.
```

### Readability Rules

Test code should be as clean as production code. Follow the same naming, formatting, and method-structure rules. Tests are documentation — make them readable.

### Don't Make Copies or Write Test Reports

Don't copy production code into test code just to have something to assert against. Tests should assert against known correct values, not duplicate the implementation.

### Test Publics, Not Private Internals

Test the public interface. If you need to test private internals, the class may need refactoring — extract the private behavior into a separate, testable class.

### Don't Obsess About Coverage

100% coverage is often not worth the effort. Focus on:
- Critical business logic paths
- Edge cases and error conditions
- Complex algorithms
- Areas that have historically had bugs

---

## Test Classes

### Call Local Test Classes by Their Purpose

Name test classes after what they test or the scenario:

```ABAP
CLASS ltc_read_order DEFINITION FINAL FOR TESTING ...
CLASS ltc_cancel_order DEFINITION FINAL FOR TESTING ...
CLASS ltc_empty_input_validation DEFINITION FINAL FOR TESTING ...
```

### Put Tests in Local Classes

Local test classes live inside the include of the class under test:

```ABAP
CLASS ltc_order_processor DEFINITION FINAL FOR TESTING
  DURATION SHORT
  RISK LEVEL HARMLESS.

  PRIVATE SECTION.
    DATA cut TYPE REF TO /clean/order_processor.
    METHODS setup.
    METHODS process_valid_order FOR TESTING.
    METHODS reject_empty_order FOR TESTING.
ENDCLASS.
```

### Put Help Methods in Help Classes

Extract shared test utilities into separate helper classes — not into the production class:

```ABAP
CLASS lth_order_factory DEFINITION.
  PUBLIC SECTION.
    CLASS-METHODS create_sample_order RETURNING VALUE(result) TYPE /clean/order.
    CLASS-METHODS create_invalid_order RETURNING VALUE(result) TYPE /clean/order.
ENDCLASS.
```

### How to Execute Test Classes

- **ADT**: `Ctrl+Shift+F10` on the test class or method
- **ABAP Unit**: Transaction `SAUNIT_CLIENT_SETUP` + `Ctrl+Shift+F10`
- **ATC**: Include unit tests as part of quality gates
- **abapGit**: Serialize and run via abaplint or external CI

---

## Code Under Test

### Name the Code Under Test Meaningfully, or Default to CUT

```ABAP
DATA(order_processor) TYPE REF TO /clean/order_processor. " preferred
DATA(cut) TYPE REF TO /clean/order_processor.             " acceptable default
```

### Test Against Interfaces, Not Implementations

```ABAP
" ✓ GOOD — test through interface
DATA(cut) TYPE REF TO /clean/if_order_processor.
cut = NEW /clean/order_processor( logger = mock_logger ).

" ✗ BAD — wire to concrete class directly
DATA(cut) TYPE REF TO /clean/order_processor.
cut = NEW /clean/order_processor( ).
```

### Extract the Call to the Code Under Test to Its Own Method

```ABAP
METHOD process_valid_order.
  DATA(order) = lth_order_factory=>create_sample_order( ).
  DATA(result) = process_order( order ).  " extracted call
  cl_abap_unit_assert=>assert_equals( act = result->status exp = 'PROCESSED' ).
ENDMETHOD.

METHOD process_order.
  result = cut->process( order ).
ENDMETHOD.
```

---

## Injection

### Use Dependency Inversion to Inject Test Doubles

```ABAP
" Production constructor
METHOD constructor.
  logger = /clean/log_factory=>create( ).
ENDMETHOD.

" Test constructor (use LOCAL FRIENDS to access)
METHOD constructor.
  logger = mock_logger.
ENDMETHOD.
```

### Consider the Tool ABAP Test Double

SAP provides `cl_abap_testdouble` for creating mock objects:

```ABAP
DATA(mock_logger) = CAST /clean/if_log(
  cl_abap_testdouble=>create( '/CLEAN/IF_LOG' ) ).
```

### Exploit the Test Tools

Use `cl_abap_unit_assert` for assertions and `cl_abap_testdouble` for mocking. Don't build your own test framework.

### Use Test Seams as Temporary Workaround

For legacy code that can't be refactored to use dependency injection, test seams (like `TEST-SEAM`) can provide injection points. Use them as a temporary measure — the goal is to refactor to proper dependency injection.

### Use LOCAL FRIENDS to Access the Dependency-Inverting Constructor

```ABAP
CLASS ltc_order_processor DEFINITION FINAL FOR TESTING
  DURATION SHORT RISK LEVEL HARMLESS
  FRIENDS /clean/order_processor.  " access private constructor
```

### Don't Misuse LOCAL FRIENDS to Invade the Tested Code

LOCAL FRIENDS should provide access to constructors for injection — not to arbitrary private methods for white-box testing. White-box testing means your tests will break on any internal refactoring.

### Don't Mock Stuff That's Not Needed

```ABAP
" ✓ GOOD — only mock what the test actually cares about
DATA(mock_logger) = cl_abap_testdouble=>create( '/CLEAN/IF_LOG' ).
DATA(cut) = NEW /clean/order_processor( logger = mock_logger ).

" Only set up expectations that matter for this test
cl_abap_testdouble=>expects( mock_logger )->log_error( )->never( ).
```

### Don't Build Test Frameworks

Don't build your own assertion library, mocking framework, or test runner. Use ABAP Unit's built-in tools.

---

## Test Methods

### Test Method Names: Reflect What's Given and Expected

```ABAP
" ✓ GOOD — tells the scenario
METHODS customer_with_overdue_balance_is_blocked FOR TESTING.
METHODS empty_order_is_rejected FOR TESTING.
METHODS valid_order_is_processed FOR TESTING.

" ✗ BAD — reveals nothing
METHODS test1 FOR TESTING.
METHODS test_process FOR TESTING.
```

### Use Given-When-Then

```ABAP
METHOD customer_with_overdue_balance_is_blocked.
  " Given — setup
  DATA(customer) = lth_customer_factory=>create_overdue( ).

  " When — exactly one call
  DATA(result) = cut->check_block_status( customer ).

  " Then — assertions
  cl_abap_unit_assert=>assert_equals( act = result exp = abap_true ).
ENDMETHOD.
```

### "When" Is Exactly One Call

The "When" section should contain exactly one call to the code under test. If you need multiple calls, create separate test methods.

### Don't Add a TEARDOWN Unless You Really Need It

ABAP Unit handles memory cleanup between tests. Only add `teardown` for explicit resource cleanup (e.g., closing test doubles with side effects).

---

## Test Data

### Make It Easy to Spot Meaning

```ABAP
" ✓ GOOD — self-explanatory values
CONSTANTS overdue_customer_id TYPE kunnr VALUE '0000000001'.
DATA(overdue_days) = 31.

" ✗ BAD — magic numbers
DATA(customer_id) = 1.
DATA(days) = 31.
```

### Make It Easy to Spot Differences

When testing with multiple similar values, make the distinguishing value obvious:

```ABAP
" ✓ GOOD — differences are at a glance
DATA(customer_a) = VALUE /clean/customer( id = '001' name = 'Alpha Corp' ).
DATA(customer_b) = VALUE /clean/customer( id = '002' name = 'Beta Inc'   ).
```

### Use Constants to Describe Purpose and Importance of Test Data

```ABAP
CONSTANTS customer_id_existing TYPE kunnr VALUE '0000000042'.
CONSTANTS customer_id_missing  TYPE kunnr VALUE '0000000099'.
```

---

## Assertions

### Few, Focused Assertions

One test method tests one behavior. Avoid large assertion blocks that test multiple unrelated things.

### Use the Right Assert Type

```ABAP
" Equality
cl_abap_unit_assert=>assert_equals( act = result exp = expected ).

" Boolean
cl_abap_unit_assert=>assert_true( result ).
cl_abap_unit_assert=>assert_false( result ).

" Initial / bound
cl_abap_unit_assert=>assert_initial( result ).
cl_abap_unit_assert=>assert_not_initial( result ).
cl_abap_unit_assert=>assert_bound( object ).
cl_abap_unit_assert=>assert_not_bound( object ).

" Exception
TRY.
    cut->process( invalid_input ).
    cl_abap_unit_assert=>fail( 'Expected exception was not raised' ).
  CATCH cx_validation_error.
    " expected
ENDTRY.

" Table
cl_abap_unit_assert=>assert_table_contains(
  line  = expected_entry
  table = result_table ).
```

### Assert Content, Not Quantity

```ABAP
" ✓ GOOD — assert what's actually in the result
cl_abap_unit_assert=>assert_table_contains(
  line  = VALUE #( id = '001' status = 'BLOCKED' )
  table = result ).

" ✗ BAD — only checking count, not what's there
cl_abap_unit_assert=>assert_equals(
  act = lines( result ) exp = 3 ).
```

### Assert Quality, Not Content

For complex results where exact content matching is fragile, assert quality properties:

```ABAP
" ✓ GOOD
cl_abap_unit_assert=>assert_true( xsdbool( result->is_valid( ) ) ).
cl_abap_unit_assert=>assert_true( xsdbool( lines( result->errors ) = 0 ) ).
```

### Use FAIL to Check for Expected Exceptions

```ABAP
TRY.
    cut->process( invalid_input ).
    cl_abap_unit_assert=>fail( 'Expected cx_validation_error' ).
  CATCH cx_validation_error.
    " pass
ENDTRY.
```

### Forward Unexpected Exceptions Instead of Catching and Failing

If a test catches an unexpected exception and then calls `FAIL`, the stack trace is lost. Better to let the exception propagate:

```ABAP
" ✓ GOOD — unexpected exceptions propagate automatically
METHOD test_process_valid.
  cut->process( valid_order ).
  cl_abap_unit_assert=>assert_equals( act = cut->status exp = 'PROCESSED' ).
ENDMETHOD.

" ✗ BAD — catches everything, loses stack trace
METHOD test_process_valid.
  TRY.
      cut->process( valid_order ).
    CATCH cx_root INTO DATA(error).
      cl_abap_unit_assert=>fail( error->get_text( ) ).
  ENDTRY.
ENDMETHOD.
```

### Write Custom Asserts to Shorten Code and Avoid Duplication

```ABAP
METHODS assert_order_processed IMPORTING order TYPE /clean/order.
METHODS assert_order_rejected IMPORTING order TYPE /clean/order.

METHOD assert_order_processed.
  cl_abap_unit_assert=>assert_equals( act = order->status exp = 'PROCESSED' ).
  cl_abap_unit_assert=>assert_not_initial( order->processed_at ).
ENDMETHOD.
```
