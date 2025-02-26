import { LuArrowDownRight } from "react-icons/lu";
import { HiClipboardList} from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiReceiptRefund } from "react-icons/hi";
import { BiTransfer } from "react-icons/bi";


export const navLinks=[
    {name:'schedule Payment',href:'/transfer'},
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
    {name:'home',href:'/'},
    {name:'profile',href:'/profile'},
    {name:'contacts',href:'/contacts'},
    {name:'payment', href:'/payment'},
    {name:'history', href:'/history'},
    {name:'Schedule Payment', href:'/transfer'},

  ]
  
  export const faqs = [
    {
     question:"What is JustPay?",
     hovered:"JustPay is a fast, secure, and low-cost way to send and receive stablecoins, just like traditional payment apps. Built on blockchain technology, it ensures private, permissionless transactions—giving you full control over your money without relying on banks.",
    },
    {
      question:"How is JustPay different from traditional payment apps?",
      hovered:"Unlike traditional apps that depend on banks, JustPay operates on blockchain technology, allowing for instant, borderless, and low-fee transactions. Plus, with stablecoins, you avoid price volatility while enjoying full financial control and privacy.",
     },
     {
      question:"Are my transactions private and secure?",
      hovered:"Yes! We prioritize your security and financial freedom. JustPay enables private, encrypted, and permissionless transactions, meaning no third parties can freeze your funds or control your money.",
     },
     {
      question:" What are stablecoins, and why should I use them?",
      hovered:"Stablecoins are cryptocurrencies pegged to the value of a stable asset, like the US dollar. This means you get the benefits of fast, decentralized payments without the price fluctuations of traditional cryptocurrencies like Bitcoin or Ethereum."
     },
     {
      question:"Do I need a bank account to use JustPay?",
      hovered:"No! JustPay is completely decentralized, meaning you don’t need a bank account to send, receive, or hold funds. All you need is a crypto wallet to start making transactions instantly.",
     },
     {
      question:"How much does it cost to send money?",
      hovered:"Transactions on JustPay are designed to be low-cost, with significantly lower fees than traditional financial services. Since we operate on blockchain networks, fees depend on network conditions but remain much cheaper than traditional banking fees.",
     }
  ]
  
    
 
export const exploreSection=[
    {description:'Experience fast, secure, and low-cost transactions with JustPay. Our platform lets you send and receive stablecoins effortlessly—just like traditional payment apps, but powered by blockchain technology.',
      image:"/images/v1.jpg"},
  
    {description:'No more waiting for bank transfers or dealing with high fees. With JustPay, you can make instant transactions globally, all while keeping your funds stable and secure.',
      image:"/images/v2.jpg"},
  
    {description: 'We prioritize your security and financial freedom. JustPay ensures private, permissionless transactions without the need for traditional banks—giving you complete control over your money.', 
      image:"/images/v3.jpg"},
  
    {description:'We believe in true financial sovereignty. With JustPay, there are no middlemen, no unnecessary verifications, and no frozen accounts—just pure financial independence. Your transactions are peer-to-peer, encrypted, and verified on the blockchain, ensuring that only you have access to your funds.',
       image:"/images/v4.jpg"}
  ]
  

  export const recommend = [
    { firstName: "Frinquilla",lastName:'Sempe', occupation:'Doctor', info:"Finally, a payment app that gives me full control over my funds. No banks, no limits—just instant transfers!", img:'/images/v1.jpg'},
    { firstName: "James",lastName:'K', occupation:'UI/UX Designer', info:"I love that I can send money to my family overseas without worrying about delays or crazy fees", img:'/images/v1.jpg' },
    { firstName: "Emily",lastName:'R', occupation:'Crypto Enthusiast', info:"As someone who values privacy, this app is a game changer. No one tracks my transactions, and I feel truly in control.", img:'/images/v1.jpg' },
    { firstName: "Michael",lastName:'T', occupation:'Remote Worker', info:"I don’t have to worry about market swings anymore. Stablecoins give me the best of crypto and traditional finance.", img:'/images/v1.jpg'},
    { firstName: "Carlos", lastName:'M.', occupation:'Digital Nomad', info:"I ditched my bank account months ago, and this app makes it so easy to manage my money without one.", img:'/images/v1.jpg'},
    { firstName: "Aisha",lastName:'B', occupation:'Small Business Owner', info:"Fees are almost non-existent compared to banks and PayPal. This app saves me money every day!", img:'/images/v1.jpg' },
  ]
  
  export const teamMembers=[
    {firstName:'Kenneth',role:"frontend developer", connect:"#", image:'/images/f31.jpeg', lastName:'danso'},
    {firstName:'Claud', role:"blockchain developer",connect:"#", image:'/images/cnft.jpeg', lastName:'opoku'},
    {firstName:'makafui', role:"ui/ux designer",connect:"#", image:'/images/moto.jpg', lastName:'richmond'}
  ]
  
  
  export const sidearContent=[
    {name:'payment',href:"/payment",icon:<HiOutlineCurrencyDollar/>},
    {name:'profile',href:"/profile",icon:<HiUser/>},
    {name:'history',href:"/history",icon:<HiReceiptRefund/>},
    {name:'contacts',href:"/contacts",icon:<HiClipboardList/>},
    {name:'Schedule',href:"/transfer",icon:<BiTransfer/>},
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

  // export const contactNumbers = [
  //   {
  //     firstName: "Claud",
  //     occupation: "Associate @Samosure",
  //     lastName: "Mensah",
  //     email: "claud.mensah@gmail.com",
  //     dateOfBirth: "21st June 2003",
  //     xHandle: "@broski",
  //     igHandle: "@dbro",
  //     facebookHandle:"@dbro",
  //     userAddress: "addr1qxyz1234567890abcd",
  //     relationship: "Colleague",
  //     phone: "+1234567890"
  //   },
  //   {
  //     firstName: "Sophia",
  //     occupation: "Data Analyst",
  //     lastName: "Smith",
  //     gmail: "sophia.smith@gmail.com",
  //     date: "15th August 1995",
  //     x: "@soph_data",
  //     ig: "@sophie_art",
  //     wallet: "addr1qabc9876543210xyz",
  //     relationship: "Best Friend",
  //     phone: "+1987654321"
  //   },
  //   {
  //     firstName: "Michael",
  //     occupation: "Software Engineer",
  //     lastName: "Johnson",
  //     gmail: "michael.johnson@gmail.com",
  //     date: "10th December 1988",
  //     x: "@mike_codes",
  //     ig: "@mike_life",
  //     wallet: "addr1qdef6543210987lmn",
  //     relationship: "Brother",
  //     phone: "+1122334455"
  //   },
  //   {
  //     firstName: "Alice",
  //     occupation: "Graphic Designer",
  //     lastName: "Brown",
  //     gmail: "alice.brown@gmail.com",
  //     date: "5th March 1992",
  //     x: "@alice_designs",
  //     ig: "@alice_creates",
  //     wallet: "addr1qghi3210987654opq",
  //     relationship: "Cousin",
  //     phone: "+1555666777"
  //   },
  //   {
  //     firstName: "Emma",
  //     occupation: "Teacher",
  //     lastName: "Davis",
  //     gmail: "emma.davis@gmail.com",
  //     date: "30th September 1985",
  //     x: "@emma_teach",
  //     ig: "@emma_lifestyle",
  //     wallet: "addr1qjkl0987654321rst",
  //     relationship: "Mentor",
  //     phone: "+1222333444"
  //   },
  //   {
  //     firstName: "John",
  //     occupation: "Nurse",
  //     lastName: "Doe",
  //     gmail: "john.doe@gmail.com",
  //     date: "12th April 1990",
  //     x: "@john_cares",
  //     ig: "@john_daily",
  //     wallet: "addr1quvw5678901234xyz",
  //     relationship: "Neighbor",
  //     phone: "+1999888777"
  //   }
  // ];
  
  

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
    // { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    // { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'},
    // { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com' ,date:'21st june 003'},
    // { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'},
    // { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    // { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com',date:'21st june 003' },
    // { firstName: 'Claud', pathner:'Premium',lastName: 'Mensah',  number: '(+233) 8603300000', gmail: '@kuvi@gmail.com',date:'21st june 003' },
    // { firstName: 'Sophia',pathner:'Premium', lastName: 'Smith',  number: '(+233) 8603300000', gmail: '@roseNtuman@gmail.com' ,date:'21st june 003'}
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