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
import CreateProjectUpload from "@/pages/create-project-upload";
import CreateProjectForm from "@/pages/create-project-form";
import CreateProjectShare from "@/pages/create-project-share";
import Notifications from "@/pages/notifications";
import VendorsPartners from "@/pages/vendors-partners";
import TaskDetail from "@/pages/task-detail";
import AddExpense from "@/pages/add-expense";
import Profile from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/projects" component={ProjectList} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/task/:id" component={TaskDetail} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/add-expense" component={AddExpense} />
      <Route path="/documents" component={Documents} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/vendors-partners" component={VendorsPartners} />
      <Route path="/profile" component={Profile} />
      <Route path="/create-project-upload" component={CreateProjectUpload} />
      <Route path="/create-project-form" component={CreateProjectForm} />
      <Route path="/create-project-share" component={CreateProjectShare} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
