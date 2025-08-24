# SQL Auth System
**A React-based personal portfolio with a built-in project showcase and lightweight project manager**  

Personal practice on creating an Auth System using SQL and React.

## ✨ Flow Diagram  
This diagram represents how the authentication system works. When the app starts, it first checks if the user is logged in by looking for an existing access token. If an access token is found, it is verified to ensure it has not expired. If the token is still valid, the user remains logged in. If the token has expired, the system calls the refresh function. If a refresh token exists, a new access token is generated and the user stays logged in. If no refresh token is available, the user is logged out. 

- The same flow can be applied to a fetchWithAuth function to check and refresh token validity when action or API call is done to keep the user logged in.
![Flow Diagram IMG](img/FlowDiagram.png)  



## ✨ Project UI for the Practice 
![Login IMG](img/Login.png)  
![SIGNUP IMG](img/Signup.png)  
![Dasboard IMG](img/Dashboard.png)  