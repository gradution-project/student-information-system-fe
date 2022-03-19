const getAll = [
    {
        enum: 'RESEARCH_ASSOCIATE',
        tr: 'Araştırma Görevlisi'
    },
    {
        enum: 'TEACHING_ASSOCIATE',
        tr: 'Öğretim Üyesi'
    },
    {
        enum: 'ASSISTANT_PROFESSOR',
        tr: 'Doçent'
    },
    {
        enum: 'PROFESSOR',
        tr: 'Profesör'
    }
]

const RESEARCH_ASSOCIATE = 'RESEARCH_ASSOCIATE';
const TEACHING_ASSOCIATE = 'TEACHING_ASSOCIATE';
const ASSISTANT_PROFESSOR = 'ASSISTANT_PROFESSOR';
const PROFESSOR = 'PROFESSOR';

const TeacherDegree = {
    getAll,
    RESEARCH_ASSOCIATE,
    TEACHING_ASSOCIATE,
    ASSISTANT_PROFESSOR,
    PROFESSOR
};

export default TeacherDegree;