
const getAll = [
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

const PREPARATORY = 'PREPARATORY';
const FIRST = 'FIRST';
const SECOND = 'SECOND';
const THIRD = 'THIRD';
const FOURTH = 'FOURTH';
const FIFTH = 'FIFTH';
const SIXTH = 'SIXTH';

const StudentClassLevel = {
    getAll,
    PREPARATORY,
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH
};

export default StudentClassLevel;