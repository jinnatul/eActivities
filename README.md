# eActivities

### Create project solution File (eActivities.sln)
- dotnet new sln

### Create sub-project's 
- dotnet new classlib -n Domain        ***Main ClassLib project
- dotnet new classlib -n Application   ***Business Logic Project
- dotnet new classlib -n Persistence   ***Database Related
- dotnet new webapi -n API             ***API Related

### Create sln for all Sub-project's
- dotnet sln add Domain/
- dotnet sln add Application/
- dotnet sln add Persistence/
- dotnet sln add API/

Project(s)
----------
- Domain/Domain.csproj
- Application/Application.csproj
- Persistence/Persistence.csproj
- API/API.csproj

### Reference between sub-Project's and Main Project
- /eActivities/Application$ dotnet add reference ../Domain/
- /eActivities/Application$ dotnet add reference ../Persistence/
- /eActivities/API$ dotnet add reference ../Application/
- /eActivities/Persistence$ dotnet add reference ../Domain/
![References](https://user-images.githubusercontent.com/31995155/71798572-e8eac780-307c-11ea-869e-1f1007db5184.png)

