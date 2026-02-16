<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;

class ReadOnlyDataController extends Controller
{
    public function users()
    {
        return User::select('id', 'name')->get();
    }

    public function userProjects(User $user)
    {
        return $user->projects()
            ->select('projects.id', 'projects.name')
            ->get();
    }

    public function projects()
    {
        return Project::with(['users:id,name'])
            ->select('id', 'name')
            ->get();
    }

    public function projectTasks(Project $project)
    {
        return Task::with(['assignedUser:id,name'])
            ->where('project_id', $project->id)
            ->select('id', 'project_id', 'assigned_user_id', 'title', 'estimated_hours')
            ->get();
    }

    public function board()
    {
        return Project::with([
            'users:id,name',
            'tasks:id,project_id,assigned_user_id,title,estimated_hours',
            'tasks.assignedUser:id,name',
        ])
        ->select('id', 'name')
        ->get();
    }
}
