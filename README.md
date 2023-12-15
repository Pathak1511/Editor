##### Improvement to be done in future

- Chat App is not working properly :
  - `Bug : If Two person from different room id do chat then it propogates to all user`
  - `Solution : Need DB to fetch user with given room id and then emit message`
- After clicking on leave button if you again joined again with different room id then you will se your old updates
  - `Bug : We are not clearing the redux states hence it occurs`
  - `Solution : We will preserve room_id in states and once Admin save the code then it will store in mongodb and when someone join the room then we will update the state with data receive from mongodb with that room_id`
- When someone create file then after writing the code they need to specify the language
  - `Solution : Write algo which split file from '.' and detect the language used and update the select section`
