
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentsLessonNotesByLessonId = async (lessonId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/notes/by/lesson/${lessonId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getAllStudentLessonsNotesByStudentId = async (studentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/notes/by/student/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const updateStudentsLessonMidtermNotes = async (operationUserId, midtermNoteIdsAndNotes) => {

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

const confirmStudentsLessonMidtermNotes = async (operationUserId, lessonNoteIds) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/midterm/confirm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonNoteIds: lessonNoteIds
        })
    });
    return await apiResult.json();
};

const updateStudentsLessonFinalNotes = async (operationUserId, finalNoteIdsAndNotes) => {

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

const confirmStudentsLessonFinalNotes = async (operationUserId, lessonNoteIds) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/final/confirm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonNoteIds: lessonNoteIds
        })
    });
    return await apiResult.json();
};

const updateStudentsLessonResitNotes = async (operationUserId, resitNoteIdsAndNotes) => {

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

const confirmStudentsLessonResitNotes = async (operationUserId, lessonNoteIds) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/lesson/note/resit/confirm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonNoteIds: lessonNoteIds
        })
    });
    return await apiResult.json();
};


const StudentLessonNoteController = {
    getAllStudentsLessonNotesByLessonId,
    getAllStudentLessonsNotesByStudentId,
    updateStudentsLessonMidtermNotes,
    confirmStudentsLessonMidtermNotes,
    updateStudentsLessonFinalNotes,
    confirmStudentsLessonFinalNotes,
    updateStudentsLessonResitNotes,
    confirmStudentsLessonResitNotes
};

export default StudentLessonNoteController;