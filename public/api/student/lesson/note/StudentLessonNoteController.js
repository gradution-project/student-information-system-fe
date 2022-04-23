
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentsLessonNotesByLessonId = async (lessonId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/get/lesson/${lessonId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getAllStudentLessonsNotesByStudentId = async (studentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/get/student/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const updateStudentLessonMidtermNote = async (operationUserId, midtermNoteIdsAndNotes) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/midterm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            midtermNoteIdsAndNotes: midtermNoteIdsAndNotes
        })
    });
    return await apiResult.json();
};

const updateStudentLessonFinalNote = async (operationUserId, finalNoteIdsAndNotes) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/final`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            finalNoteIdsAndNotes: finalNoteIdsAndNotes
        })
    });
    return await apiResult.json();
};

const updateStudentLessonResitNote = async (operationUserId, resitNoteIdsAndNotes) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/resit`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            resitNoteIdsAndNotes: resitNoteIdsAndNotes
        })
    });
    return await apiResult.json();
};


const StudentLessonNoteController = {
    getAllStudentsLessonNotesByLessonId,
    getAllStudentLessonsNotesByStudentId,
    updateStudentLessonMidtermNote,
    updateStudentLessonFinalNote,
    updateStudentLessonResitNote
};

export default StudentLessonNoteController;