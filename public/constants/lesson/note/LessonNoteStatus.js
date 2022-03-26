const getAll = [
    {
        enum: 'UNFINALISED',
        tr: 'Sonuçlandırılmadı',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Sonuçlandırılmadı</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Sonuçlandırılmadı</span>
    },
    {
        enum: 'PASSED',
        tr: 'Geçti',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Geçti</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Geçti</span>
    },
    {
        enum: 'FAILED',
        tr: 'Kaldı',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Kaldı</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Kaldı</span>
    }
]

const UNFINALISED = 'UNFINALISED';
const PASSED = 'PASSED';
const FAILED = 'FAILED';
const ALL = 'ALL';

const LessonNoteStatus = {
    getAll,
    UNFINALISED,
    PASSED,
    FAILED,
    ALL
};

export default LessonNoteStatus;