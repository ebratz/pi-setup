# Clean ABAP — Variables & Types

## Constants

### Use Constants Instead of Magic Numbers

```ABAP
" ✓ GOOD
IF abap_type = cl_abap_typedescr=>typekind_date.

" ✗ BAD
IF abap_type = 'D'.
```

### Constants Need Descriptive Names

Wrap literals in constants with names describing _meaning_, not just content or type:

```ABAP
" ✓ GOOD
CONSTANTS status_inactive TYPE mmsta VALUE '90'.

" ✗ BAD — merely repeats value or type
CONSTANTS c_01 TYPE spart VALUE '01'.
```

It's acceptable to repeat the value if it's already descriptive: `CONSTANTS status_cancelled TYPE sww_wistat VALUE 'CANCELLED'`.

### Prefer ENUM to Constants Interfaces

Use ABAP-native `ENUM` (≥ 7.51):

```ABAP
CLASS /clean/message_severity DEFINITION PUBLIC ABSTRACT FINAL.
  PUBLIC SECTION.
    TYPES: BEGIN OF ENUM type,
             warning,
             error,
           END OF ENUM type.
ENDCLASS.
```

Avoid interfaces masquerading as constant collections:
```ABAP
" ✗ BAD — mixing unrelated things
INTERFACE /dirty/common_constants.
  CONSTANTS:
    warning      TYPE symsgty VALUE 'W',
    transitional TYPE i       VALUE 1,
    error        TYPE symsgty VALUE 'E',
    persisted    TYPE i       VALUE 2.
ENDINTERFACE.
```

For older releases without `ENUM`, see SAP's [enumeration patterns](https://github.com/SAP/styleguides/blob/main/clean-abap/sub-sections/Enumerations.md).

### If Not Using ENUM, Group Your Constants

```ABAP
" ✓ GOOD — grouped by concept
CONSTANTS:
  BEGIN OF message_severity,
    warning TYPE symsgty VALUE 'W',
    error   TYPE symsgty VALUE 'E',
  END OF message_severity,
  BEGIN OF message_lifespan,
    transitional TYPE i VALUE 1,
    persisted    TYPE i VALUE 2,
  END OF message_lifespan.
```

---

## Variables

### Prefer Inline to Up-Front Declarations

Methods should be so short (3-5 statements) that inline declarations look natural:

```ABAP
" ✓ GOOD
METHOD do_something.
  DATA(name) = 'something'.
  DATA(reader) = /clean/reader=>get_instance_for( name ).
  result = reader->read_it( ).
ENDMETHOD.

" ✗ BAD — separate DATA section
METHOD do_something.
  DATA: name TYPE seoclsname, reader TYPE REF TO /dirty/reader.
  name = 'something'.
  reader = /dirty/reader=>get_instance_for( name ).
  result = reader->read_it( ).
ENDMETHOD.
```

### Don't Use Variables Outside Their Declaration Block

```ABAP
" ✗ BAD — variable used outside IF block where declared
IF has_entries = abap_true.
  DATA(value) = 1.
ELSE.
  value = 2.  " confusing: declared inside IF but used here
ENDIF.

" ✓ GOOD — declare before the block
DATA value TYPE i.
IF has_entries = abap_true.
  value = 1.
ELSE.
  value = 2.
ENDIF.
```

### Don't Chain Up-Front Declarations

```ABAP
" ✓ GOOD
DATA name TYPE seoclsname.
DATA reader TYPE REF TO reader.

" ✗ BAD — chaining suggests false relationship
DATA: name TYPE seoclsname, reader TYPE REF TO reader.
```

### Don't Use Field Symbols for Dynamic Data Access

Starting ABAP Platform 2021, field symbols are rarely needed for generic/dynamic access:

```ABAP
" ✓ GOOD
result = dref->*.

" ✗ BAD
ASSIGN dref->* TO <fs>.
result = <fs>.
```

### Choose the Right Loop Targets

| Target | Use When |
|--------|----------|
| `ASSIGNING FIELD-SYMBOL(<line>)` | Reading or manipulating data being iterated. Slightly faster. |
| `REFERENCE INTO DATA(line)` | Need references outside the loop, or context mostly uses objects/references |
| `INTO DATA(line)` | Need a copy of the data, or line type is already a reference |

```ABAP
" Field symbol — for data manipulation
LOOP AT table ASSIGNING FIELD-SYMBOL(<line>).
  obj->do_something( <line> ).
ENDLOOP.

" Reference — for object-oriented contexts
LOOP AT table REFERENCE INTO DATA(line).
  obj->do_something( line->* ).
ENDLOOP.
```

---

## Tables

### Use the Right Table Type

| Type | Use For |
|------|---------|
| `HASHED` | Large tables, filled once, never modified, read often by key |
| `SORTED` | Large tables, need sorting, filled incrementally, read by key, processed in order |
| `STANDARD` | Small tables (indexing overhead > benefit), "arrays", append-order processing |

> Each change to a `HASHED` table recalculates the hash — don't use for frequently modified tables.

### Avoid DEFAULT KEY

```ABAP
" ✗ BAD — DEFAULT KEY wastes resources, can cause obscure bugs
DATA itab TYPE STANDARD TABLE OF row_type WITH DEFAULT KEY.

" ✓ GOOD — explicit key
DATA itab2 TYPE STANDARD TABLE OF row_type WITH NON-UNIQUE KEY comp1 comp2.

" ✓ GOOD — no key needed
DATA itab1 TYPE STANDARD TABLE OF row_type WITH EMPTY KEY.
```

**Caution:** `SORT` on `EMPTY KEY` tables without explicit sort fields won't sort at all.

### Prefer INSERT INTO TABLE to APPEND TO

```ABAP
" ✓ GOOD — works with all table/key types
INSERT VALUE #( ... ) INTO TABLE itab.
```

Use `APPEND TO` only for `STANDARD` tables in array-like fashion, stressing the last-row position.

### Table Read Patterns

```ABAP
" ✓ GOOD — existence check
IF line_exists( my_table[ key = 'A' ] ).

" ✓ GOOD — single read (use expression)
DATA(line) = my_table[ key = 'A' ].

" ✓ GOOD — loop with WHERE filter
LOOP AT my_table REFERENCE INTO DATA(line) WHERE key = 'A'.
```

Avoid unnecessary double reads:
```ABAP
" ✓ GOOD — expect row to exist, catch exception
TRY.
    DATA(row) = my_table[ key = input ].
  CATCH cx_sy_itab_line_not_found.
    RAISE EXCEPTION NEW /clean/my_data_not_found( ).
ENDTRY.

" ✗ BAD — double read
IF NOT line_exists( my_table[ key = input ] ).
  RAISE EXCEPTION NEW /clean/my_data_not_found( ).
ENDIF.
DATA(row) = my_table[ key = input ].
```

| Old Pattern | Modern Replacement |
|---|---|
| `READ TABLE ... TRANSPORTING NO FIELDS WITH KEY ...` + `sy-subrc` | `line_exists( table[ key = ... ] )` |
| `READ TABLE ... INTO ... WITH KEY ...` | `DATA(x) = table[ key = ... ]` |
| `LOOP AT ... WHERE ... EXIT. ENDLOOP.` | `READ TABLE ... WITH KEY ...` or `table[ key = ... ]` |
| `LOOP AT ... IF ... EXIT. ENDIF. ENDLOOP.` | `LOOP AT ... WHERE ...` |
| `APPEND ... TO table.` | `INSERT VALUE #( ... ) INTO TABLE table.` |

---

## Strings

### Use Backtick for Literals

```ABAP
" ✓ GOOD
CONSTANTS some_constant TYPE string VALUE `ABC`.
DATA(some_string) = `ABC`.  " → TYPE string

" ✗ BAD — superfluous type conversion
DATA some_string TYPE string.
some_string = 'ABC'.
```

Avoid `|` for simple fixed values — it can't be used for `CONSTANTS` and adds overhead.

### Use String Templates for Assembly

```ABAP
" ✓ GOOD — highlights what's literal vs variable
DATA(message) = |Received HTTP code { status_code } with message { text }|.

" ✗ BAD — harder to read
DATA(message) = `Received an unexpected HTTP ` && status_code && ` with message ` && text.
```

---

## Booleans

### Use Booleans Wisely

Booleans are a bad choice to distinguish _types_ of things — you'll nearly always encounter non-binary cases. Use enumerations instead:

```ABAP
" ✓ GOOD
archiving_status = /clean/archivation_status=>archiving_in_process.

" ✗ BAD — will break when a third state appears
is_archived = abap_true.
```

### Use ABAP_BOOL for Boolean Variables

```ABAP
" ✓ GOOD
DATA has_entries TYPE abap_bool.
```

Don't use `char1` (obscures intent) or `boolean` (supports third "undefined" value). For DynPro fields, resort to `abap_boolean`.

### Use ABAP_TRUE / ABAP_FALSE for Comparisons

```ABAP
" ✓ GOOD
has_entries = abap_true.
IF has_entries = abap_false.

" ✗ BAD
has_entries = 'X'.
IF has_entries = space.
IF has_entries IS NOT INITIAL.
```

### Use XSDBOOL to Set Boolean Variables

```ABAP
" ✓ GOOD
DATA(has_entries) = xsdbool( line IS NOT INITIAL ).

" ✗ BAD — needlessly long
IF line IS INITIAL.
  has_entries = abap_false.
ELSE.
  has_entries = abap_true.
ENDIF.
```

Alternative: `COND` ternary form (longer, requires implicit default knowledge):
```ABAP
DATA(has_entries) = COND abap_bool( WHEN line IS NOT INITIAL THEN abap_true ).
```
