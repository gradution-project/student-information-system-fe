const getAll = [
    {
        enum: 'FIRST_SEMESTER_LESSON_DATE_RANGE',
        tr: '1. Dönem Ders Haftası Aralığı',
        switch: false
    },
    {
        enum: 'SECOND_SEMESTER_LESSON_DATE_RANGE',
        tr: '2. Dönem Ders Haftası Aralığı',
        switch: false
    },
    {
        enum: 'FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS',
        tr: '1. Dönem Ders Kayıt İşlemleri',
        switch: true
    },
    {
        enum: 'SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS',
        tr: '2. Dönem Ders Kayıt İşlemleri',
        switch: true
    },
    {
        enum: 'NOTE_OPERATIONS',
        tr: 'Not İşlemleri',
        switch: true
    },
    {
        enum: 'MIDTERM_NOTE_OPERATIONS',
        tr: 'Vize Not İşlemleri',
        switch: true
    },
    {
        enum: 'FINAL_NOTE_OPERATIONS',
        tr: 'Final Not İşlemleri',
        switch: true
    },
    {
        enum: 'RESIT_NOTE_OPERATIONS',
        tr: 'Bütünleme Not İşlemleri',
        switch: true
    }
]

const FIRST_SEMESTER_LESSON_DATE_RANGE = 'FIRST_SEMESTER_LESSON_DATE_RANGE';
const SECOND_SEMESTER_LESSON_DATE_RANGE = 'SECOND_SEMESTER_LESSON_DATE_RANGE';
const FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS = 'FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS';
const SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS = 'SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS';
const NOTE_OPERATIONS = 'NOTE_OPERATIONS';
const MIDTERM_NOTE_OPERATIONS = 'MIDTERM_NOTE_OPERATIONS';
const FINAL_NOTE_OPERATIONS = 'FINAL_NOTE_OPERATIONS';
const RESIT_NOTE_OPERATIONS = 'RESIT_NOTE_OPERATIONS';

const FeatureToggleName = {
    getAll,
    FIRST_SEMESTER_LESSON_DATE_RANGE,
    SECOND_SEMESTER_LESSON_DATE_RANGE,
    FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS,
    SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS,
    NOTE_OPERATIONS,
    MIDTERM_NOTE_OPERATIONS,
    FINAL_NOTE_OPERATIONS,
    RESIT_NOTE_OPERATIONS
};

export default FeatureToggleName;