const getAll = [
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

const ASSOCIATE = 'ASSOCIATE';
const UNDERGRADUATE = 'UNDERGRADUATE';
const POSTGRADUATE = 'POSTGRADUATE';
const DOCTORAL = 'DOCTORAL';

const StudentDegree = {
    getAll,
    ASSOCIATE,
    UNDERGRADUATE,
    POSTGRADUATE,
    DOCTORAL
};

export default StudentDegree;