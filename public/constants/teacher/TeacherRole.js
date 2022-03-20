const getAll = [
    {
        enum: 'TEACHER',
        tr: 'Öğretmen'
    },
    {
        enum: 'ADVISOR',
        tr: 'Danışman'
    },
    {
        enum: 'HEAD_OF_DEPARTMENT',
        tr: 'Bölüm Başkanı'
    }
]

const TEACHER = 'TEACHER';
const ADVISOR = 'ADVISOR';
const HEAD_OF_DEPARTMENT = 'HEAD_OF_DEPARTMENT';

const TeacherRole = {
    getAll,
    TEACHER,
    ADVISOR,
    HEAD_OF_DEPARTMENT
};

export default TeacherRole;