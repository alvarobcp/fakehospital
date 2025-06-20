import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById('root')).render(
 
<Auth0Provider
  domain="dev-8chgryx2knyxtr23.us.auth0.com"
  clientId="JSHSHnEtSHkYgxwKT6PLSpKcgNERqb4e"
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: "https://dev-8chgryx2knyxtr23.us.auth0.com/api/v2/",
    scope: "openid profile email"
  }}
>
  <App />
</Auth0Provider>
 
)
