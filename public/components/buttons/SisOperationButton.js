
function getSaveButton(context) {
    return (
        <button
            type="submit"
            className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
        >
            {context}
        </button>
    )
}

function getUpdateButton(onClickMethod, context) {
    return (
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
                onClick={onClickMethod}
                type="submit"
                className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
            >
                {context}
            </button>
        </div>
    )
}

function getActivateButton(onClickMethod, context) {
    return (
        <button
            onClick={onClickMethod}
            type="submit"
            className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
        >
            {context}
        </button>
    )
}

function getPassivateButton(onClickMethod, context) {
    return (
        <button
            onClick={onClickMethod}
            type="submit"
            className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
        >
            {context}
        </button>
    )
}

function getDeleteButton(onClickMethod, context) {
    return (
        <button
            onClick={onClickMethod}
            type="submit"
            className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-red-600 hover:bg-sis-darkblue"
        >
            {context}
        </button>
    )
}

function getGraduateButton(onClickMethod, context) {
    return (
        <button
            onClick={onClickMethod}
            type="submit"
            className="block float-right font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl text-sis-white rounded-md text-white bg-sis-blue hover:bg-sis-darkblue"
        >
            {context}
        </button>
    )
}


const SisOperationButton = {
    getSaveButton,
    getUpdateButton,
    getActivateButton,
    getPassivateButton,
    getDeleteButton,
    getGraduateButton
};

export default SisOperationButton;