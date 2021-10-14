import React from "react";

const Poem = () => {
    return (
        <div class="flex flex-col justify-between text-center hover:bg-gray-100 font-light bg-white h-32 w-25 rounded">
            <div class="flex-1 py-10 hover:underline">
                Words inside poem
            </div>
            <div class="rounded bg-red-50 flex justify-end px-4">
                <div>
                    Authors
                </div>
            </div>
        </div>
    );
}

export default Poem;