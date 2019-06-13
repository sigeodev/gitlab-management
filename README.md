<p align="center">
  <a href="https://sigeosrl.com/" rel="noopener" target="_blank"><img width="280" src="https://sigeosrl.eu/wp-content/uploads/2018/07/SigeoDarkRetina-350x92.png" alt="SIGEO logo"></a></p>
</p>

# Gitlab Management
Gitlab Management is a Gitlab API wrapper for make your life easier. 

We working on ***live demo***, give us little more time!

## Installation
Gitlab Management is available as an [npm package](https://www.npmjs.com/package/@sigeo/gitlab-management).

```sh
// With npm
npm install @sigeo/gitlab-management

// With yarn
yarn add @sigeo/gitlab-management
```

## Usage
Here is a quick example to get you started, **it's all you need**:

```jsx
import React, { PureComponent }  from 'react';
import ReactDOM from 'react-dom';
import GitlabManagement from '@sigeo/gitlab-management';

class App extends PureComponent {
  componentDidMount () {
    const gitlabProjectId = ...;
    const gitlabReporter = ...;
    const gitlabInstance = new GitlabManagement(gitlabProjectId, gitlabReporter);
    
    gitlabInstance.openIssue({
      title: 'Issue example',
      description: "It's an example",
      labels: 'Example'
    });
  }

  ...
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Before use it
The library work only if you have set a Gitlab **project id** and a Gitlab **private token** on it. You can do it in two ways:
* **Constructor way**: you can pass 2 arguments in the class constructor (like example on top):
  * Project id as first argument
  * Private key as second argument
* With **ad hoc** methods:
  * You can use **setProjectId** private method for set the Gitlab **project id**
  * You can use **setPrivateToken** private method for set the Gitlab **private token**
  

## Methods
Gitlab Management have a lot of method for wrapper Gitlab API:

Property | Arguments number | Arguments Type | Return type | Description
---|---|---|---|---
`setProjectId` | 1 | `string` | `void` | Set Gitlab project id
`getProjectId` | 0 |  | `string` | Return Gitlab project id
`setPrivateToken` | 1 | `string` | `void` | Set Gitlab private token
`getPrivateToken` | 0 | | `string` | Return Gitlab private token
`setHeaders` | 1 | `object` | `void` | An key-value map for set headers in API calls
`getHeaders` | 0 | | `object` | Return headers
`getProjects` | 1 | `IGetProjectsProps interface` | `Promise` | Get gitlab projects
`getMembers` | 1 | `IGetMembersProps interface` | `Promise` | Get all projects members
`openIssue` | 1 | `INewIssueProps interface` | `Promise` | Open a new issue
`getIssues` | 1 | `IGetIssuesProps interface` | `Promise` | Get issues
`closeIssue` | 1 | `IDeleteIssueProps interface` | `Promise` | Close an issue

## Interfaces
We use interfaces for many arguments methods. This is the list:

### INewIssueProps
Used in `openIssue` method:
```js
/**
 * Open a new issue.
 */
export interface INewIssueProps {
  iid?: number | string; // The internal ID of the project’s issue.
  title: string; // The title of an issue.
  description?: string; // The description of an issue.
  confidential?: boolean; // Set an issue to be confidential. Default is false.
  assignee_ids?: number[]; // The ID of a user to assign issue.
  milestone_id?: number; // The global ID of a milestone to assign issue.
  labels?: string; // Comma-separated label names for an issue.
  created_at?: string; // Date time string, ISO 8601 formatted, e.g. 2016-03-11T03:45:40Z.
  due_date?: string; // Date time string in the format YEAR-MONTH-DAY, e.g. 2016-03-11.
  weight?: number; // The weight of the issue. Valid values are greater than or equal to 0.

  /**
   * The ID of a discussion to resolve. This will fill in the issue
   * with a default description and mark the discussion as resolved.
   * Use in combination with merge_request_to_resolve_discussions_of.
   */
  discussion_to_resolve?: string;

  /**
   * The IID of a merge request in which to resolve all issues.
   * This will fill the issue with a default description and mark all discussions
   * as resolved. When passing a description or title, these values
   * will take precedence over the default values.
   */
  merge_request_to_resolve_discussions_of?: number;
}
```

### IGetIssuesProps
Used in `getIssues` method:
```js
/**
 * Get a list of a project’s issues.
 */
export interface IGetIssuesProps {
  iids?: number[]; // Return only the milestone having the given iid.
  state?: string; // Return all issues or just those that are opened or closed.
  with_labels_details?: boolean; // If true, response will return more details for each label in labels field: :name, :color, :description, :text_color. Default is false.
  milestone?: string; // The milestone title. None lists all issues with no milestone. Any lists all issues that have an assigned milestone.
  author_username?: string; // Return issues created by the given username. Simillar to author_id and mutually exclusive with author_id.
  weight?: number; // Return issues with the specified weight. None returns issues with no weight assigned. Any returns issues with a weight assigned.
  order_by?: string; // Return issues ordered by created_at or updated_at fields. Default is created_at.
  sort?: string; // Return issues sorted in asc or desc order. Default is desc.
  search?: string; // Search project issues against their title and description.
  created_after?: string; // Return issues created on or after the given time.
  created_before?: string; // Return issues created on or before the given time.
  updated_after?: string; // Return issues updated on or after the given time.
  updated_before?: string; // Return issues updated on or before the given time.
  confidential?: string; // Filter confidential or public issues.

  /**
   * Return issues reacted by the authenticated user by the given emoji.
   * None returns issues not given a reaction. Any returns issues given
   * at least one reaction. (Introduced in GitLab 10.0)
   */
  my_reaction_emoji?: string;

  /**
   * Return issues assigned to the given username.
   * Simillar to assignee_id and mutually exclusive with assignee_id.
   * In CE version assignee_username array should only contain a single
   * value or an invalid param error will be returned otherwise.
   */
  assignee_username?: string[];

  /**
   * Return issues assigned to the given user id. Mutually exclusive with assignee_username.
   * None returns unassigned issues. Any returns issues with an assignee. (Introduced in GitLab 9.5)
   */
  assignee_id?: number;

  /**
   * Return issues for the given scope: created_by_me, assigned_to_me or all.
   * For versions before 11.0, use the now deprecated created-by-me or assigned-to-me scopes instead.
   * (Introduced in GitLab 9.5. Changed to snake_case in GitLab 11.0)
   */
  scope?: string;

  /**
   * Return issues created by the given user id. Mutually exclusive with author_username.
   * Combine with scope=all or scope=assigned_to_me. (Introduced in GitLab 9.5)
   */
  author_id?: number;

  /**
   * Comma-separated list of label names, issues must have all labels to be returned.
   * None lists all issues with no labels. Any lists all issues with at least one label.
   * No+Label (Deprecated) lists all issues with no labels. Predefined names are case-insensitive.
   */
  labels?: string;
}
```

### IGetProjectsProps
Used in `getProjects` method:
```js
/**
 * Get a list of projects.
 */
export interface IGetProjectsProps {
  archived?: boolean; // Limit by archived status
  visibility?: string; // Limit by visibility public, internal, or private
  sort?: string; // Return projects sorted in asc or desc order. Default is desc.
  search?: string; // Return list of projects matching the search criteria.
  owned?: boolean; // Limit by projects explicitly owned by the current user.
  membership?: boolean; // Limit by projects that the current user is a member of.
  starred?: boolean; // Limit by projects starred by the current user.
  statistics?: boolean; // Include project statistics.
  with_custom_attributes?: boolean; // Include custom attributes in response (admins only).
  with_issues_enabled?: boolean; // Limit by enabled issues feature.
  with_merge_requests_enabled?: boolean; // Limit by enabled merge requests feature.
  with_programming_language?: string; // Limit by projects which use the given programming language.
  wiki_checksum_failed?: boolean; // Limit projects where the wiki checksum calculation has failed.
  repository_checksum_failed?: boolean; // Limit projects where the repository checksum calculation has failed.
  min_access_level?: number; // Limit by current user minimal access level.

  /**
   * Return only limited fields for each project. This is
   * a no-op without authentication as then only simple fields are returned.
   */
  simple?: boolean;

  /**
   * Return projects ordered by id, name, path, created_at
   * updated_at, or last_activity_at fields. Default is created_at.
   */
  order_by?: string;
}
```

### IGetMembersProps
Used in `getMembers` method:
```js
/**
 * Get a list of project members.
 */
export interface IGetMembersProps {
  query?: string; // A query string to search for members.
}
```

### IDeleteIssueProps
Used in `closeIssue` method:
```js
/**
 * Delete an issue.
 */
export interface IDeleteIssueProps {
  issue_iid: number; // The internal ID of a project’s issue.
}
```

## Security
This package can create **an important vulnerability** if you use it **front-end side** because it's simple to see the private token using for it.
We recommend to use this package only **back-end side** with **Node JS**.

Enjoy!
