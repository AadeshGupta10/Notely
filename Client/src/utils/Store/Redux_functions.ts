import { createSlice } from "@reduxjs/toolkit"

interface data_schema {
    title: string,
    description: string,
    tags: string[],
    pin: boolean,
    createdAt: string
}

const initialState = {
    authentication: false,
    loading: false,
    data: <data_schema[]>[],
    pinnedArr: <Array<string>>[]
}

const Redux_functions = createSlice({
    name: "Redux_functions",
    initialState,
    reducers: {
        handleLoading: (state, action) => {
            state.loading = action.payload;
        },
        handleAuthentication: (state, action) => {
            state.authentication = action.payload
        },
        fetchNotes: (state, action) => {

            const { notes, pin_array } = action.payload;

            state.pinnedArr = [...pin_array]
            state.data = [...notes];

            pin_array.reverse().map((createdAt: string) => {
                const pinnedData = state.data.filter((note) => (
                    note.createdAt === createdAt
                ));

                state.data = state.data.filter((note) => (
                    note.createdAt !== createdAt
                ));

                state.data.unshift(...pinnedData)
            })
        },
        CreateNote: (state, action) => {
            state.data.unshift({ ...action.payload })
        },
        EditNote: (state, action) => {
            const { title, description, tags, createdAt } = action.payload

            state.data = state.data.map((note) => (
                note.createdAt == createdAt ?
                    { ...note, title, description, tags }
                    : note
            ))
        },
        DeleteNote: (state, action) => {
            state.data = state.data.filter((note) => (
                note.createdAt != action.payload
            ))
        },
        PinNote: (state, action) => {
            const createdAt = action.payload;

            state.pinnedArr.unshift(createdAt);

            const pinnedData = state.data.filter((note) => (
                note.createdAt == createdAt
            ));

            state.data = state.data.filter((note) => (
                note.createdAt != createdAt
            ));

            state.data.unshift(...pinnedData)
        },
        UnPinNote: (state, action) => {
            const createdAt = action.payload;

            state.pinnedArr = state.pinnedArr.filter((pinDateTime) => (
                pinDateTime != createdAt
            ));

            const pinnedNotes = state.data.filter((note) => (
                state.pinnedArr.includes(note.createdAt)
            ))

            var Notes = state.data.filter((note) => (
                !state.pinnedArr.includes(note.createdAt)
            ))

            const timestamp = (date: string) => {
                return (new Date(date)).getTime();
            }

            Notes = Notes.sort((a: any, b: any) => timestamp(b.createdAt) - timestamp(a.createdAt));

            state.data = [...pinnedNotes, ...Notes];
        }
    }
})

export const { handleLoading, handleAuthentication, fetchNotes, CreateNote, EditNote, DeleteNote, PinNote, UnPinNote } = Redux_functions.actions;

export default Redux_functions.reducer;