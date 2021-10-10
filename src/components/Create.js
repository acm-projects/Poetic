import React from "react"

const Create = () => {
    return (
        <div class="flex h-screen gap-4 p-4 bg-blue-500">
            <div class="flex-1 bg-white rounded p-4 text-4xl">
                <div class="flex flex-col gap-4">
                    <div>
                        Poem Title
                    </div>
                    <div class="flex">
                        <div class="bg-blue-100 rounded">

                        </div>
                        <div class="h-32 bg-white rounded">

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="bg-blue-100 rounded p-4 text-4xl">
                    Contributors
                    <div class="text-base">
                        first person
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;