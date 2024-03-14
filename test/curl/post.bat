@echo off

curl -X POST "http://localhost:3000/api/akamai" ^
-H "accept: application/json" ^
-H "content-type: application/json" ^
-d "{\"objects\":[\"https://xcdn.next.co.uk/common/items/default/default/itemimages/altitemzoom/762695s2.jpg?im=Resize,width=364\",\"https://xcdn.next.co.uk/common/items/default/default/itemimages/altitemzoom/762695s2.jpg?im=Resize,width=364\"]}"

pause

@REM -d {\"objects\":\"https://xcdn.next.co.uk/common/items/default/default/itemimages/altitemzoom/594877s6.jpg?im=Resize,width=364\"}"
@REM -d "{\"objects\":[\"https://xcdn.next.co.uk/common/items/default/default/itemimages/altitemzoom/762695s2.jpg?im=Resize,width=364\",\"https://xcdn.next.co.uk/common/items/default/default/itemimages/altitemzoom/594877s6.jpg?im=Resize,width=364\"]}"

pause
