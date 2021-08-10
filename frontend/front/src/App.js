import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// Link
} from 'react-router-dom';

// main
import Home from './Home/Home.js';
import SearchFriends from './SearchFriends/SearchFriends';

// chat
import Chat from '../src/Chat/Chat';
import ChatVideo from './Chat/ChatVideo';

//MyPage
import MyPage from '../src/MyPage/MyPage';
// component
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';

import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import FormMyPage from './MyPage/FormMyPage';

function App() {
	return (
		<RecoilRoot>
			<Suspense fallback={<div>Loading...</div>}>
				<Router>
					<NavBar />
					<div className='App'></div>
					<Switch>
						{/* main */}
						<Route exact path='/' component={Home} />
						<Route exact path='/searchFriends' component={SearchFriends} />

						{/* chat */}
						<Route exact path='/chat' component={Chat} />
						<Route exact path='/chatvideo' component={ChatVideo} />

						{/* component */}
						<Route exact path='/mypage' component={MyPage} />
						<Route exact path='/update/user_detail' component={FormMyPage} />
						<Route exact path='/login' component={LoginPage} />
						<Route exact path='/signup' component={SignupPage} />
					</Switch>
				</Router>
			</Suspense>
		</RecoilRoot>
	);
}

export default App;
