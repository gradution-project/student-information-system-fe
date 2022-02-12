
export const studentClassLevels = [
    {
        enum: 'PREPARATORY',
        tr: 'Hazırlık Sınıfı',
        value: 0
    },
    {
        enum: 'FIRST',
        tr: '1. Sınıf',
        value: 1
    },
    {
        enum: 'SECOND',
        tr: '2. Sınıf',
        value: 2
    },
    {
        enum: 'THIRD',
        tr: '3. Sınıf',
        value: 3
    },
    {
        enum: 'FOURTH',
        tr: '4. Sınıf',
        value: 4
    },
    {
        enum: 'FIFTH',
        tr: '5. Sınıf',
        value: 5
    },
    {
        enum: 'SIXTH',
        tr: '6. Sınıf',
        value: 6
    }
]

export const studentDegrees = [
    {
        enum: 'ASSOCIATE',
        tr: 'Önlisans'
    },
    {
        enum: 'UNDERGRADUATE',
        tr: 'Lisans'
    },
    {
        enum: 'POSTGRADUATE',
        tr: 'Yüksek Lisans'
    },
    {
        enum: 'DOCTORAL',
        tr: 'Doktora'
    }
]

export const studentStatuses = [
    {
        enum: 'ACTIVE',
        tr: 'Aktif',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Aktif</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Aktif</span>
    },
    {
        enum: 'PASSIVE',
        tr: 'Pasif',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Pasif</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Pasif</span>
    },
    {
        enum: 'DELETED',
        tr: 'Silinmiş',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Silinmiş</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Silinmiş</span>
    },
    {
        enum: 'GRADUATED',
        tr: 'Mezun',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-blue font-phenomenaBold text-lg text-sis-white ">Mezun</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-blue font-phenomenaBold text-2xl text-sis-white ">Mezun</span>
    }
]