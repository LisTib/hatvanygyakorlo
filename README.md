# Hatványgyakorló

Online gyakorlóoldal a hatványozás azonosságaihoz, véletlenszerűen generált feladatokkal.

- azonos alapú hatványok szorzása és osztása
- szorzat és hányados hatványa
- hatvány hatványa
- vegyes mód, három nehézségi szinttel

Az oldal egyetlen önálló fájl (`index.html`), build nélkül működik. Az eredmények a böngésző `localStorage`-ában maradnak meg.

## Kipróbálás helyben

Nyisd meg az `index.html` fájlt a böngészőben.

## Ellenőrzés

A feladatgenerátor helyességét számértékes teszt ellenőrzi:

    node tests/verify.js

## Bővítés

A feladatgenerátorok az `index.html` `ENGINE START` és `ENGINE END` jelölése között vannak. Új tételhez egy új generátorfüggvény és egy bejegyzés kell a `TOPICS` listában.
