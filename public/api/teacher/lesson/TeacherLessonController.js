
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getAllTeachersLessons = async () => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/lesson`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getTeacherLessonsByTeacherId = async (teacherId) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/lesson/get/${teacherId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveTeacherLesson = async (operationUserId, lessonId, teacherId) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/lesson/save`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            teacherLessonInfoRequest: {
                lessonId: lessonId,
                teacherId: teacherId
            }
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const deleteTeacherLesson = async (lessonId, teacherId) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/lesson/delete`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({
            teacherLessonInfoRequest: {
                lessonId: lessonId,
                teacherId: teacherId
            }
        }),
    });
    return await apiResult.json();
};


const TeacherLessonController = {
    getAllTeachersLessons,
    getTeacherLessonsByTeacherId,
    saveTeacherLesson,
    deleteTeacherLesson
};

export default TeacherLessonController;