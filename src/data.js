//
export const contacts = [
  {
    id: 1,
    firstName: "john",
    lastName: "Doe",
    infos: "I wanna remind you to continue to dream and dream big",
    phoneNumber: "+221 78 389 42 17",
    profile: 'JD',
    avatar: "",
    color: '#f7f7f7',
    archived: false
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    infos: "Some text to show",
    phoneNumber: "+221 78 000 00 00",
    profile: 'JD',
    color: '#f7f7f7',
    avatar: "",
    archived: false
  },
  { 
    id: 3, 
    firstName: "Fatou", 
    lastName: "Ndiaye",
    infos: "ReseauWoman en action !",
    phoneNumber: "+221 78 000 00 00",
    profile: 'FN',
    color: '#f7f7f7',
    avatar: "",
    archived: true
  },
  { 
    id: 4, 
    firstName: "Aminatou", 
    lastName: "Sayande",
    infos: "K-Pop forever !",
    phoneNumber: "+221 78 000 00 00",
    profile: 'AS',
    color: '#f7f7f7',
    avatar: "",
    archived: false
  },
];

export const groups = [
  {
    id: 1,
    name: "Projet Web",
    members: [1, 2],
    description: "Discussions sur le projet HTML/CSS/JS",
    picture: "../assets/user-group.svg"
  },
  {
    id: 2,
    name: "Famille",
    members: [2, 3],
    description: "Groupe familial",
    picture: "../assets/user-group.svg"
  },
];

export const messages = [
  {
    id: 1,
    sender: 1,
    receiver: 2,
    content: "Salut Jane, comment ça va ?",
    timestamp: "2025-05-28T10:00:00Z",
  },
  {
    id: 2,
    sender: 2,
    receiver: 1,
    content: "Ça va bien, merci ! Et toi ?",
    timestamp: "2025-05-28T10:05:00Z",
  },
  {
    id: 3,
    sender: 1,
    receiver: 2,
    content: "Je vais bien aussi, merci !",
    timestamp: "2025-05-28T10:10:00Z",
  },
];

export const notifications = [
  {
    id: 1,
    type: "message",
    content: "Nouveau message de Jane Doe",
    timestamp: "2025-05-28T10:15:00Z",
    read: false,
  },
  {
    id: 2,
    type: "group",
    content: "Nouveau groupe créé : Projet Web",
    timestamp: "2025-05-28T10:20:00Z",
    read: true,
  },
];