# Clean ABAP — Language Constructs

## Mind the Legacy

If coding for older ABAP releases, validate guidelines against the oldest release you must support. Many recommendations use relatively new syntax. However, the vast majority of rules (naming, commenting) work in _any_ ABAP version.

## Mind the Performance

Some aspects of Clean Code may make things slower (more method calls) or consume more memory (more objects). ABAP compares data types when calling methods, so splitting one large method into many sub-methods may be slower.

**Don't optimize prematurely.** Build things clean and object-oriented first. If something is too slow, measure it. Only then discard selected rules based on facts.

Key insight from Martin Fowler's _Refactoring_: In typical applications, as little as 10% of code accounts for 90% of runtime. In ABAP, a large proportion of runtime is database time. Focus on clean structure during development, then use the profiler to identify critical areas to optimize.

## Prefer Object Orientation to Procedural Programming

OO programs (classes, interfaces) segment better and are easier to refactor and test than procedural code (functions, programs). For procedural objects (RFC functions, transactions), keep them as thin wrappers:

```ABAP
FUNCTION check_business_partner [...].
  DATA(validator) = NEW /clean/biz_partner_validator( ).
  result = validator->validate( business_partners ).
ENDFUNCTION.
```

## Prefer Functional to Procedural Language Constructs

Modern functional constructs are shorter and more natural:

```ABAP
" ✓ GOOD — functional
DATA(variable) = 'A'.
DATA(uppercase) = to_upper( lowercase ).
index += 1.                                     " >= NW 7.54
DATA(object) = NEW /clean/my_class( ).
result = VALUE #( FOR row IN input ( row-text ) ).
DATA(line) = value_pairs[ name = 'A' ].
DATA(exists) = xsdbool( line_exists( value_pairs[ name = 'A' ] ) ).

" ✗ BAD — procedural
MOVE 'A' TO variable.
TRANSLATE lowercase TO UPPER CASE.
ADD 1 TO index.
CREATE OBJECT object TYPE /dirty/my_class.
READ TABLE value_pairs INTO DATA(line) WITH KEY name = 'A'.
```

### Key Modern Replacements

| Old (Avoid) | New (Use) | Min Release |
|---|---|---|
| `MOVE ... TO ...` | `variable = value` | Any |
| `TRANSLATE ... TO UPPER CASE` | `to_upper( )` | 7.50 |
| `ADD 1 TO index` | `index += 1` | 7.54 |
| `CREATE OBJECT` | `NEW class( )` | 7.40 |
| `READ TABLE ... WITH KEY` | `table[ key = value ]` | 7.40 |
| `LOOP AT ... INTO` | `VALUE #( FOR row IN ... ( ... ) )` | 7.40 |
| `APPEND TO` | `INSERT VALUE #( ... ) INTO TABLE` | 7.40 |
| `CALL METHOD` | Direct method call `obj->method( )` | 7.40 |
| `DATA: ... TYPE ...` | `DATA(name) = value` (inline) | 7.40 |

## Avoid Obsolete Language Elements

When upgrading ABAP versions, check for obsolete elements and stop using them. Obsolete elements lose optimization benefits and confuse younger ABAPers who weren't taught them.

**Example — host variable escaping:**
```ABAP
" ✓ GOOD — @-escaped (modern)
SELECT * FROM spfli
  WHERE carrid = @carrid AND connid = @connid
  INTO TABLE @itab.

" ✗ BAD — unescaped (obsolete)
SELECT * FROM spfli
  WHERE carrid = carrid AND connid = connid
  INTO TABLE itab.
```

SAP provides per-release lists of obsolete elements:
[NW 7.50](https://help.sap.com/doc/abapdocu_750_index_htm/7.50/en-US/index.htm?file=abenabap_obsolete.htm) through [NW 7.57](https://help.sap.com/doc/abapdocu_757_index_htm/7.57/en-US/index.htm?file=abenabap_obsolete.htm).

## Use Design Patterns Wisely

Apply design patterns where they are appropriate and provide noticeable benefit. Don't apply them everywhere just for the sake of it.
