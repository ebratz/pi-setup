# Clean ABAP — Naming

## Use Descriptive Names

Use names that convey the content and meaning of things. Don't focus on data type or technical encoding.

```ABAP
" ✓ GOOD
CONSTANTS max_wait_time_in_seconds TYPE i ...
DATA customizing_entries TYPE STANDARD TABLE ...
METHODS read_user_preferences ...
CLASS /clean/user_preference_reader ...

" ✗ BAD
CONSTANTS sysubrc_04 TYPE sysubrc ...
DATA iso3166tab TYPE STANDARD TABLE ...
METHODS read_t005 ...
CLASS /dirty/t005_reader ...
```

## Prefer Solution Domain and Problem Domain Terms

- **Problem domain**: Business field terms like "account", "ledger", "invoice" — best for business-like layers (APIs, business objects).
- **Solution domain**: Computer science terms like "queue", "tree", "factory" — best for technical layers (factory classes, algorithms).

Do not invent your own language. Names must be understandable by developers, product owners, partners, and customers without a customized dictionary.

## Use Plural

Prefer plural for lists/collections. Use `countries` instead of `country` for a "table of countries". This targets variables and properties — database tables may follow competing conventions (e.g., singular transparent table names).

## Use Pronounceable Names

```ABAP
" ✓ GOOD
detection_object_types

" ✗ BAD
dobjt
```

## Use snake_case

ABAP is case insensitive — use `snake_case` consistently. When hitting length limits (e.g., 30 chars for methods), abbreviate conscientiously rather than falling back to `flatcase` or `UPPERCASE`.

```ABAP
" ✓ GOOD
DATA max_response_time_in_millisec TYPE i.

" ✗ BAD
DATA maxresponsetimeinmilliseconds TYPE i.
```

## Avoid Abbreviations

Write out names in full. Only abbreviate if you exceed length limitations. If you must abbreviate, start with the _unimportant_ words. Abbreviations become ambiguous fast — does "cust" mean "customizing", "customer", or "custom"?

## Use Same Abbreviations Everywhere

People search for keywords. Always abbreviate "detection object type" to "dobjt" — don't mix "dot", "dotype", "detobjtype".

## Use Nouns for Classes, Verbs for Methods

```ABAP
" ✓ GOOD — nouns for classes
CLASS /clean/account
CLASS /clean/user_preferences
INTERFACE /clean/customizing_reader

" ✓ GOOD — verbs for methods
METHODS withdraw
METHODS add_message
METHODS read_entries

" ✓ GOOD — boolean methods with is_/has_
IF is_empty( table ).
```

## Avoid Noise Words

Omit or replace noise words like "data", "info", "object":

```ABAP
" ✓ GOOD
account              " instead of account_data
alert                " instead of alert_object
user_preferences     " instead of user_info
response_time_in_seconds  " instead of response_time_variable
```

## Pick One Word Per Concept

Don't mix synonyms — it makes readers waste time finding a non-existent difference:

```ABAP
" ✓ GOOD — consistent
METHODS read_this.
METHODS read_that.
METHODS read_those.

" ✗ BAD — mixed synonyms
METHODS read_this.
METHODS retrieve_that.
METHODS query_those.
```

## Use Pattern Names Only If You Mean Them

Don't call your class `file_factory` unless it really implements the Factory design pattern. Common patterns: singleton, factory, facade, composite, decorator, iterator, observer, strategy.

## Avoid Encodings (Hungarian Notation, Prefixes)

Get rid of _all_ encoding prefixes. They add noise without value:

```ABAP
" ✓ GOOD
METHOD add_two_numbers.
  result = a + b.
ENDMETHOD.

" ✗ BAD
METHOD add_two_numbers.
  rv_result = iv_a + iv_b.
ENDMETHOD.
```

This includes: `rv_` (returning value), `iv_` (importing value), `cv_` (changing value), `gv_` (global variable), `lv_` (local variable), `ls_` (local structure), `lt_` (local table), `mo_` (member object), etc.

## Avoid Obscuring Built-in Functions

Within a class, built-in functions are obscured by methods with the same name. Avoid naming methods `lines`, `line_exists`, `condense`, `strlen`, etc.

```ABAP
" ✗ BAD — obscures built-in functions
METHODS lines RETURNING VALUE(result) TYPE i.
METHODS line_exists RETURNING VALUE(result) TYPE i.
CLASS-METHODS condense RETURNING VALUE(result) TYPE i.
CLASS-METHODS strlen RETURNING VALUE(result) TYPE i.
```
