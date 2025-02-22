import { LuArrowDownRight } from "react-icons/lu";
import { HiClipboardList} from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { HiReceiptRefund } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";


export const navLinks=[
    {name:'home',href:'/'},
    {name:'dashboard', href:'/dashboard'},
    {name:'profile',href:'/profile'},
    {name:'contacts',href:'/contacts'},
    {name:'payment', href:'/payment'},
]

export const sociaLinks=[
    {name:'discord', icon: <LuArrowDownRight className='h-6'/>,href:'#'},
    {name:'twitter', icon:<LuArrowDownRight className='h-6'/>,href:'#'},
    {name:'linkedIn', icon:<LuArrowDownRight className='h-6'/>, href:'#'},
    {name:'Instagram', icon:<LuArrowDownRight className='h-6'/>, href:'#'}
  ]
 
  export const footerLinks=[
    {name:'terms',href:"/"},
    {name:'dashboard', href:"/dashboard"},
    {name:'profile', href:"/profile"},
    {name:'payment', href:"/payment"},
    {name:'terms',href:"/aa"},
    {name:'dashboard', href:"/cc"},
    {name:'profile', href:"/pe"},
    {name:'payment', href:"/pt"}
  ]
  
  export const faqs = [
    {
     question:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
     hovered:"Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo? consectetur adipisicing elit. Enim, explicabo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
    },
    {
      question:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
      hovered:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
     },
     {
      question:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
      hovered:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
     },
     {
      question:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
      hovered:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?"
     },
     {
      question:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
      hovered:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
     },
     {
      question:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
      hovered:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, explicabo?",
     }
  ]
  
    
 
export const exploreSection=[
    {description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque expedita nam in repudiandae, quibusdam debitis iure dicta molestiae dolor quaerat.',
      image:"/images/v1.jpg"},
  
    {description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque expedita nam in repudiandae, quibusdam debitis iure dicta molestiae dolor quaerat.',
      image:"/images/v2.jpg"},
  
    {description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque expedita nam in repudiandae, quibusdam debitis iure dicta molestiae dolor quaerat.', 
      image:"/images/v3.jpg"},
  
    {description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque expedita nam in repudiandae, quibusdam debitis iure dicta molestiae dolor quaerat.',
       image:"/images/v4.jpg"}
  ]
  

  export const recommend = [
    { firstName: "Frinquilla",lastName:'Sempe', occupation:'UI/UX Designer', info:"loremhighest solid must be worked and info a", img:'/images/v1.jpg'},
    { firstName: "February",lastName:'Sempe', occupation:'UI/UX Designer', info:"loremhighest solid must be worked and info a", img:'/images/v1.jpg' },
    { firstName: "March",lastName:'Sempe', occupation:'UI/UX Designer', info:"loremhighest solid must be worked and info a", img:'/images/v1.jpg' },
    { firstName: "April",lastName:'Sempe', occupation:'UI/UX Designer', info:"loremhighest solid must be worked and info a", img:'/images/v1.jpg'},
    { firstName: "May", lastName:'Sempe', occupation:'UI/UX Designer', info:"loremhighest solid must be worked and info a", img:'/images/v1.jpg'},
    { firstName: "June",lastName:'Sempe', occupation:'UI/UX Designer', info:"loremhighest solid must be worked and info a", img:'/images/v1.jpg' },
  ]
  
  export const teamMembers=[
    {firstName:'Kenneth',role:"frontend developer", connect:"#", image:'/images/ken.jpg', lastName:'danso'},
    {firstName:'Claud', role:"blockchain developer",connect:"#", image:'/images/claud_img.jpg', lastName:'opoku'},
    {firstName:'makafui', role:"ui/ux designer",connect:"#", image:'/images/moto.jpg', lastName:'richmond'}
  ]
  
  
  export const sidearContent=[
    {name:'dashboard',href:"/dashboard",icon:<HiOutlineDesktopComputer/>},
    {name:'payment',href:"/payment",icon:<HiOutlineCurrencyDollar/>},
    {name:'profile',href:"/profile",icon:<HiUser/>},
    {name:'history',href:"/history",icon:<HiReceiptRefund/>},
    {name:'groups',href:"/groups",icon:<FaPeopleGroup/>},
    {name:'contacts',href:"/contacts",icon:<HiClipboardList/>},
  ]
  

  export const contactDevice=[
    {title:'All Contact', number:108},
    {title:'Activation Bizzard', number:17},
    {title: 'Electric Arts', number:18},
    {title:'Mascourt', number:10},
    {title:'Sega', number:101}
  ]

  export const contactPsync=[
    {title:'All Contact', number:108},
    {title:'Activation Bizzard', number:17},
    {title: 'Electric Arts', number:18},
    {title:'Mascourt', number:10},
    {title:'Sega', number:101}
  ]

  export const contactShared=[
    {title:'All Contact', number:108},
    {title:'Brands Namco', number:4},
    {title: 'Coupon', number:18},
  ]

  export const contactNumbers = [
    {
      firstName: "Claud",
      occupation: " Associate @Samosure",
      lastName: "Mensah",
      gmail: "claud.mensah@gmail.com",
      date: "21st June 2003",
      x: "@broski",
      ig: "@dbro",
      relationship: 'Friend'
    },
    {
      firstName: "Sophia",
      occupation: "Data Analyst",
      lastName: "Smith",
      gmail: "sophia.smith@gmail.com",
      date: "15th August 1995",
      x: "@soph_data",
      ig: "@sophie_art",
       relationship: 'Friend'
    },
    {
      firstName: "Michael",
      occupation: "Software Engineer",
      lastName: "Johnson",
      gmail: "michael.johnson@gmail.com",
      date: "10th December 1988",
      x: "@mike_codes",
      ig: "@mike_life",
       relationship: 'Friend'
    },
    {
      firstName: "Alice",
      occupation: "Graphic Designer",
      lastName: "Brown",
      gmail: "alice.brown@gmail.com",
      date: "5th March 1992",
      x: "@alice_designs",
      ig: "@alice_creates",
       relationship: 'Friend'
    },
    {
      firstName: "Emma",
      occupation: "Teacher",
      lastName: "Davis",
      gmail: "emma.davis@gmail.com",
      date: "30th September 1985",
      x: "@emma_teach",
      ig: "@emma_lifestyle",
       relationship: 'Friend'
    },
    {
      firstName: "John",
      occupation: "Nurse",
      lastName: "Doe",
      gmail: "john.doe@gmail.com",
      date: "12th April 1990",
      x: "@john_cares",
      ig: "@john_daily",
       relationship: 'Friend'
    }
  ];

  export const eventsData = [
    {
      date: "2025-02-06",
      title: "Tech Conference",
      time: "10:00 AM",
      description: "An amazing tech event.",
      images: {
        images: [
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
        ],
      },
    },
    {
      date: "2025-03-10",
      title: "Design Meetup",
      time: "2:00 PM",
      description: "A meetup for designers.",
      images: {
        images: [
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
        ],
      },
    },

    {
      date: "2025-03-10",
      title: "Design Meetup",
      time: "2:00 PM",
      description: "A meetup for designers.",
      images: {
        images: [
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
        ],
      },
    },

    {
      date: "2025-03-10",
      title: "Design Meetup",
      time: "2:00 PM",
      description: "A meetup for designers.",
      images: {
        images: [
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
          "/images/cardano.png",
        ],
      },
    },

  ];
  


  export const eventGroup = [
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'},
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com' ,date:'21st june 003'},
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'},
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com',date:'21st june 003' },
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'}
  ];
  

  export const recentGroup = [
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com',date:'21st june 003' },
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'},
  ];


  export const contactGroup = [
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com',date:'21st june 003' },
    { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com' ,date:'21st june 003'},
    { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'},
  ];


  export const transactions=[
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
    {walletAddress:'0FXX0003255555581249999',date:'25 Jan 10:28:14 AM',completed:'Completed',ratings:'-$13000'},
  ]
  
  
  export const addNewContacts = [
    {
      firstName: "Claud",
      occupation: "Junior Public Health Officer, Associate @Samosure",
      lastName: "Mensah",
      gmail: "claud.mensah@gmail.com",
      date: "21st June 2003",
      x: "@broski",
      ig: "@dbro"
    },
    {
      firstName: "Sophia",
      occupation: "Data Analyst, Freelancer @Upwork",
      lastName: "Smith",
      gmail: "sophia.smith@gmail.com",
      date: "15th August 1995",
      x: "@soph_data",
      ig: "@sophie_art"
    },
    {
      firstName: "Michael",
      occupation: "Software Engineer, Google",
      lastName: "Johnson",
      gmail: "michael.johnson@gmail.com",
      date: "10th December 1988",
      x: "@mike_codes",
      ig: "@mike_life"
    },
    {
      firstName: "Alice",
      occupation: "Graphic Designer, Adobe",
      lastName: "Brown",
      gmail: "alice.brown@gmail.com",
      date: "5th March 1992",
      x: "@alice_designs",
      ig: "@alice_creates"
    },
    {
      firstName: "Emma",
      occupation: "Teacher, Greenfield High School",
      lastName: "Davis",
      gmail: "emma.davis@gmail.com",
      date: "30th September 1985",
      x: "@emma_teach",
      ig: "@emma_lifestyle"
    },
    {
      firstName: "John",
      occupation: "Nurse, City General Hospital",
      lastName: "Doe",
      gmail: "john.doe@gmail.com",
      date: "12th April 1990",
      x: "@john_cares",
      ig: "@john_daily"
    }
  ];