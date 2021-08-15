import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'
import axios from 'axios';
const { persistAtom } = recoilPersist()

// mypage

const token = 'Bearer ' + localStorage.getItem('token');
const data = 'http://localhost:8080/api/data/';

export const topicState = atom({
	key: 'topic',
	default: [],
});

export const userDetailState = atom({
	key: 'userDetail',
	default: {},
	effects_UNSTABLE: [persistAtom]
});

export const languageState = atom({
	key: 'language',
	default: [],
});

export const countryState = atom({
	key: 'country',
	default: [],
});

export const getTopicState = selector({
	key: 'topic/get',
	get: async () => {
		const res = await axios.get(data + 'topic', {
			headers: {
				Authorization: token,
			},

		});
		return res.data;
	},
	set: ({ set }, data) => {
		set(topicState, data);
	},
});

export const getLanguageState = selector({
	key: 'language/get',
	get: async () => {
		const res = await axios.get(data + 'language', {
			headers: {
				Authorization: token,
			},
		});

		return res.data;
	},
	set: ({ set }, data) => {
		set(languageState, data);
	},
});

export const getCountryState = selector({
	key: 'country/get',
	get: async () => {
		const res = await axios.get(data + 'country', {
			headers: {
				Authorization: token,
			},
		});
		return res.data;
	},
	set: ({ set }, data) => {
		set(countryState, data);
	},
});

// chat
export const myUidState = atom({
    key: "myUidState",
    default: "",
    effects_UNSTABLE: [persistAtom]
});

export const opponentUidState = atom({
    key: "opp_uid",
    default: "47l6q9o6i4c3k",
});

export const opponentdataState = atom({
    key: "opp_data",
    default: { id : 18, name:"you", lang: "ko", profileImage:"data:image/jpeg;base64,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"},
});

export const roomSeqState = atom({
    key: "room_seq",
    default: "",
    effects_UNSTABLE: [persistAtom]
});


// searchfriends
const userid = localStorage.getItem('user_id'); 

    export const categoryState = atom({
      key: 'categoryState',
      default: []
    })

    export const getCategorySelector = selector({
      key: "category/get",
      get: async() => {
          try{
              const response = await axios.get('http://localhost:8080/api/data/topic',{
                headers:{ 'Authorization': token},
            });
            return response.data;
          }catch(err){
              throw err;
          }
      },
      set: ({set}, newValue) => {
          set(categoryState, newValue)
      }
  })

  export const userListState = atom({
      key: "userlist",
      default: false,
  })

  export const getUserListState = selector({
      key: "userlist/get",
      get: async({get}) => {
          try{
            const response = await axios.get('http://localhost:8080/api/topicusers', {
                headers:{ 'Authorization': token },
                params:{
                    topicid: get(tempIdState),
                    userid: get(userIdState)
                }
            });
            return response.data;
          }catch(err){
            throw err;
          }
      },
      set: ({set}, newValue) => {
          set(userListState, newValue)
      }
  })

  export const tempIdState = atom({
      key: "id",
      default: 4,
      effects_UNSTABLE: [persistAtom]
  })

  export const userIdState = atom({
      key: "userid",
      default: userid,
      effects_UNSTABLE: [persistAtom]
  })

  export const user1IdState = atom({
      key: "user1Id",
      default: 0,
      effects_UNSTABLE: [persistAtom]
  })

  export const user1UIdState = atom({
      key: "user1UId",
      default: "",
      effects_UNSTABLE: [persistAtom]
  })

  export const user2IdState = atom({
      key: "user2Id",
      default: 0,
      effects_UNSTABLE: [persistAtom]
  })

  export const user2UIdState = atom({
      key: "user2UId",
      default: "",
      effects_UNSTABLE: [persistAtom]
  })