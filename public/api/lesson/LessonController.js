
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllLessonsByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/lessons?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getLessonByLessonId = async (lessonId) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/${lessonId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveLesson = async (operationUserId, lessonInfo) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonInfoRequest: {
                compulsoryOrElective: lessonInfo.compulsoryOrElective,
                credit: lessonInfo.credit,
                theoreticalHours: lessonInfo.theoreticalHours,
                practiceHours: lessonInfo.practiceHours,
                departmentId: lessonInfo.departmentId,
                name: lessonInfo.name,
                semester: lessonInfo.semester
            }
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const updateLesson = async (operationUserId, lessonId, lessonInfo) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/${lessonId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonInfoRequest: {
                compulsoryOrElective: lessonInfo.compulsoryOrElective,
                credit: lessonInfo.credit,
                theoreticalHours: lessonInfo.theoreticalHours,
                practiceHours: lessonInfo.practiceHours,
                departmentId: lessonInfo.departmentId,
                name: lessonInfo.name,
                semester: lessonInfo.semester
            }
        }),
    });
    return await apiResult.json();
};

const activateLesson = async (operationUserId, lessonId) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/activate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonId: lessonId
        }),
    });
    return await apiResult.json();
};

const passivateLesson = async (operationUserId, lessonId) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/passivate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonId: lessonId
        }),
    });
    return await apiResult.json();
};

const deleteLesson = async (operationUserId, lessonId) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            lessonId: lessonId
        }),
    });
    return await apiResult.json();
};


const LessonController = {
    getAllLessonsByStatus,
    getLessonByLessonId,
    saveLesson,
    updateLesson,
    activateLesson,
    passivateLesson,
    deleteLesson
};

export default LessonController;