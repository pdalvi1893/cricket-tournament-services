/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  // {
  //   path: '/example', // the url
  //   icon: 'HomeIcon', // the component being exported from icons/index.js
  //   name: 'Dashboard', // name that appear in Sidebar
  //   exact: true,
  // },
  {
    icon: 'PagesIcon',
    name: 'Manage',
    routes: [
      // submenu
      {
        path: '/tournament/players',
        name: 'Players',
      },
      {
        path: '/tournament/teams',
        name: 'Teams',
      },
      {
        path: '/tournament/batting-cards',
        name: 'Batting Cards',
      },
      {
        path: '/tournament/bowling-cards',
        name: 'Bowling Cards',
      },
      {
        path: '/tournament/commentary-master-table',
        name: 'Commentary Master Table',
      },
      {
        path: '/tournament/runs',
        name: 'Runs',
      },
      {
        path: '/tournament/shot-timings',
        name: 'Shot Timings',
      }
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Challenges',
    routes: [
      // submenu
      {
        path: '/tournament/challenge-one',
        name: 'Challenge #1',
      },
      {
        path: '/tournament/challenge-two',
        name: 'Challenge #2',
      },
      {
        path: '/tournament/challenge-three',
        name: 'Challenge #3',
      },
    ],
  },
  
]

export type { IRoute }
export default routes
