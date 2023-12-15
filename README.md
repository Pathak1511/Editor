##### DB for storing files and synchronizing is not connected yet

You can take detail about how this db work from here

### Editor Chat and room creating socket service

1. [Github](https://github.com/Pathak1511/EditorBackend)
2. [Host](https://codesync-hritik.koyeb.app/)

### Editor DB API

1. [Github](https://github.com/Pathak1511/codesync-auth)
2. [Host](https://codeflow-3ir4.onrender.com)
3. [Documentation](https://documenter.getpostman.com/view/18873680/2s9YkgEm9W)

##### Improvement to be done in future

- Chat App is not working properly :
  - `Bug : If Two person from different room id do chat then it propogates to all user`
  - `Solution : Need DB to fetch user with given room id and then emit message`
- After clicking on leave button if you again joined again with different room id then you will se your old updates
  - `Bug : We are not clearing the redux states hence it occurs`
  - `Solution : We will preserve room_id in states and once Admin save the code then it will store in mongodb and when someone join the room then we will update the state with data receive from mongodb with that room_id`
- When someone create file then after writing the code they need to specify the language
  - `Solution : Write algo which split file from '.' and detect the language used and update the select section`
