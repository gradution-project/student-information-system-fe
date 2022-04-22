const getAll = [
    {
        enum: 'FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS',
        tr: '1. Dönem Ders Kayıt İşlemleri'
    },
    {
        enum: 'SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS',
        tr: '2. Dönem Ders Kayıt İşlemleri'
    },
    {
        enum: 'NOTE_OPERATIONS',
        tr: 'Not İşlemleri'
    },
    {
        enum: 'MIDTERM_NOTE_OPERATIONS',
        tr: 'Vize Not İşlemleri'
    },
    {
        enum: 'FINAL_NOTE_OPERATIONS',
        tr: 'Final Not İşlemleri'
    },
    {
        enum: 'RESIT_NOTE_OPERATIONS',
        tr: 'Bütünleme Not İşlemleri'
    }
]

const FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS = 'FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS';
const SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS = 'SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS';
const NOTE_OPERATIONS = 'NOTE_OPERATIONS';
const MIDTERM_NOTE_OPERATIONS = 'MIDTERM_NOTE_OPERATIONS';
const FINAL_NOTE_OPERATIONS = 'FINAL_NOTE_OPERATIONS';
const RESIT_NOTE_OPERATIONS = 'RESIT_NOTE_OPERATIONS';

const FeatureToggleName = {
    getAll,
    FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS,
    SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS,
    NOTE_OPERATIONS,
    MIDTERM_NOTE_OPERATIONS,
    FINAL_NOTE_OPERATIONS,
    RESIT_NOTE_OPERATIONS
};

export default FeatureToggleName;