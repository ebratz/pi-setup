# Clean ABAP — Formatting

## Be Consistent

Choose one formatting style and apply it uniformly across your codebase. Consistency makes code predictable and easier to scan.

## Optimize for Reading, Not for Writing

Code is read far more often than it is written. Spend the extra keystrokes to make it readable.

## Use the ABAP Formatter Before Activating

Run the ABAP Development Tools (ADT) built-in formatter (`Shift+F1`) before every activation. It handles the majority of formatting rules automatically.

## Use Your Team's ABAP Formatter Settings

Agree on a shared formatter profile. Store it in your team's repository so everyone formats identically.

## No More Than One Statement Per Line

```ABAP
" ✓ GOOD
DATA name TYPE string.
name = 'Hello'.

" ✗ BAD
DATA: name TYPE string. name = 'Hello'.
```

## Stick to a Reasonable Line Length

Keep lines ≤ 120 characters. Longer lines are harder to read, especially in side-by-side diffs and code reviews.

## Condense Your Code

Don't spread trivial statements across unnecessary vertical space:

```ABAP
" ✓ GOOD
DATA name TYPE string.
name = 'Hello'.

" ✗ BAD — excessive blank lines
DATA name TYPE string.


name = 'Hello'.
```

## Add a Single Blank Line to Separate Things, but Not More

```ABAP
" ✓ GOOD — one blank line between conceptual blocks
METHOD process_order.
  DATA(order) = read_order( order_id ).

  validate_order( order ).

  save_order( order ).
  send_confirmation( order ).
ENDMETHOD.
```

## Don't Obsess with Separating Blank Lines

If a method is small enough (3-5 lines), blank lines add noise rather than clarity. Use blank lines to separate _conceptual_ blocks, not every single statement.

## Align Assignments to the Same Object, But Not to Different Ones

```ABAP
" ✓ GOOD — align related assignments
object->name    = input_name.
object->address = input_address.
object->city    = input_city.

" ✗ BAD — don't align unrelated assignments
DATA name    TYPE string.
DATA address TYPE string.
name    = input_name.
address = input_address.
```

## Close Brackets at Line End

```ABAP
" ✓ GOOD
DATA(result) = calculate( a = 1 b = 2 ).

" ✗ BAD — bracket alone on line
DATA(result) = calculate(
  a = 1
  b = 2
).
```

## Keep Single Parameter Calls on One Line

```ABAP
" ✓ GOOD
DATA(trimmed) = trim( input ).

" ✗ BAD — unnecessary line break
DATA(trimmed) = trim(
  input
).
```

## Keep Parameters Behind the Call

```ABAP
" ✓ GOOD
method_name( param1 = value1
             param2 = value2 ).

" ✗ BAD — parameter before call
method_name(
  param1 = value1
  param2 = value2
).
```

## If You Break, Indent Parameters Under the Call

```ABAP
" ✓ GOOD
DATA(result) = long_method_name( parameter1 = value1
                                 parameter2 = value2
                                 parameter3 = value3 ).

" Or with a line break after (:
DATA(result) = long_method_name(
  parameter1 = value1
  parameter2 = value2
  parameter3 = value3
).
```

## Line-Break Multiple Parameters

```ABAP
" ✓ GOOD — each parameter on its own line
modify->update(
  node           = /clean/my_bo_c=>node-item
  key            = item->key
  data           = item
  changed_fields = changed_fields
).
```

## Align Parameters

```ABAP
" ✓ GOOD — aligned parameter names and values
modify->update( node           = /clean/my_bo_c=>node-item
                key            = item->key
                data           = item
                changed_fields = changed_fields ).
```

## Break the Call to a New Line If the Line Gets Too Long

```ABAP
" ✓ GOOD
DATA(result) = method_with_very_long_name(
  parameter = a_very_long_expression
).

" Or
DATA(result)
  = method_with_long_name( parameter = expression ).
```

## Indent and Snap to Tab

Use the standard indentation (typically 2 spaces). Use the ADT formatter to enforce this. Snap to indentation tab stops — don't manually space.

## Indent In-Line Declarations Like Method Calls

```ABAP
" ✓ GOOD
LOOP AT table REFERENCE INTO DATA(line).
  process( line ).
ENDLOOP.

" ✗ BAD — inconsistent indentation
LOOP AT table REFERENCE INTO DATA(line).
    process( line ).
ENDLOOP.
```

## Don't Align Type Clauses

```ABAP
" ✓ GOOD
DATA name TYPE string.
DATA address TYPE string.
DATA city TYPE string.

" ✗ BAD — aligned types waste time, break on rename
DATA name    TYPE string.
DATA address TYPE string.
DATA city    TYPE string.
```

## Don't Chain Assignments

```ABAP
" ✓ GOOD
a = 1.
b = 1.
c = 1.

" ✗ BAD — hard to scan, misleading suggestion of relationship
a = b = c = 1.
```
