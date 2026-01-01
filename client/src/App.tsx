import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import ProjectList from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Tasks from "@/pages/tasks";
import Expenses from "@/pages/expenses";
import Documents from "@/pages/documents";
import Chat from "@/pages/chat";
import ScanDocuments from "@/pages/scan";
import CreateProjectUpload from "@/pages/create-project-upload";
import CreateProjectForm from "@/pages/create-project-form";
import CreateProjectShare from "@/pages/create-project-share";
import Notifications from "@/pages/notifications";
import VendorsPartners from "@/pages/vendors-partners";
import TaskDetail from "@/pages/task-detail";
import AddExpense from "@/pages/add-expense";
import Profile from "@/pages/profile";
import { AuthProvider } from "@/lib/auth-context";

import Register from "./pages/register";
import { ProtectedRoute } from "./lib/protected-route";
import Login from "./pages/login";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/projects" component={ProjectList} />
      <ProtectedRoute path="/project/:id" component={ProjectDetail} />
      <ProtectedRoute path="/tasks" component={Tasks} />
      <ProtectedRoute path="/chat" component={Chat} />
      <ProtectedRoute path="/scan" component={ScanDocuments} />
      <ProtectedRoute path="/task/:id" component={TaskDetail} />
      <ProtectedRoute path="/expenses" component={Expenses} />
      <ProtectedRoute path="/add-expense" component={AddExpense} />
      <ProtectedRoute path="/documents" component={Documents} />
      <ProtectedRoute path="/notifications" component={Notifications} />
      <ProtectedRoute path="/vendors-partners" component={VendorsPartners} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/create-project-upload" component={CreateProjectUpload} />
      <ProtectedRoute path="/create-project-form" component={CreateProjectForm} />
      <ProtectedRoute path="/create-project-share" component={CreateProjectShare} />
      {/* Register/Onboarding might need to be protected but only for logged in users who haven't finished onboarding. 
          For simplicity, making it accessible or protected. Since user needs to be logged in via OTP first, it is protected. */}
      <ProtectedRoute path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

