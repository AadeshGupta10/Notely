import { useState } from 'react'
import Cards from '../../components/Cards/Cards'
import { Add } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import Modal from 'react-modal';
import { useSelector } from 'react-redux'
import AddNote from '../../components/Modal/AddNote';
import DeleteNote from '../../components/Modal/DeleteNote';
import ViewNote from '../../components/Modal/ViewNote';
import EditNote from '../../components/Modal/EditNote';

const Home = () => {

    const [viewModal, setViewModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [id, setId] = useState("");
    const [CreatedAt, setCreatedAt] = useState("")
    const [deleteTitle, setDeleteTitle] = useState("")

    const handleEditModal = (id: string, createdAt: string) => {
        setId(id);
        setCreatedAt(createdAt);
        setEditModal(!editModal);
    }

    const handleDeleteModal = (id: string, title: string, createdAt: string) => {
        setId(id);
        setDeleteTitle(title);
        setCreatedAt(createdAt);
        setDeleteModal(!deleteModal);
    }

    const handleViewModal = (createdAt: string) => {
        setCreatedAt(createdAt);
        setViewModal(!viewModal);
    }

    const notes = useSelector((state: any) => state.data);

    return (
        <div className={`h-full ${notes.length == 0 && "bg-[url('/no_notes.webp')] bg-no-repeat bg-contain bg-center"}`}>
            <div className='p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    notes.length > 0 && notes.map((note: any) => (
                        <Cards
                            id={note._id}
                            title={note.title}
                            createdAt={note.createdAt}
                            description={note.description}
                            tags={note.tags}
                            pin={note.pin}
                            key={note.createdAt}
                            view={() => handleViewModal(note.createdAt)}
                            edit={() => handleEditModal(note._id, note.createdAt)}
                            del={() => handleDeleteModal(note._id, note.title, note.createdAt)}
                        />
                    ))
                }
            </div>

            {/* Add Note Button */}
            <div className='absolute bottom-11 right-9 bg-sky-400 hover:bg-sky-500 p-2 flex justify-center items-center rounded-lg cursor-pointer transition-colors' onClick={() => setAddModal(true)}>
                <Tooltip title="Add Note" placement='left'>
                    <Add fontSize='large' />
                </Tooltip>
            </div>

            {/* View Note Modal */}
            <Modal
                isOpen={viewModal}
                style={{
                    overlay: { backgroundColor: "#ffffff9f" },
                    content: {
                        maxWidth: "35rem",
                        height: "fit-content",
                        maxHeight: "90vh",
                        margin: "auto",
                        padding: "1rem",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }
                }}>
                {/* View Note Component */}
                <ViewNote close={() => setViewModal(false)} createdAt={CreatedAt} />
            </Modal>

            {/* Add Note Modal */}
            <Modal
                isOpen={addModal}
                style={{
                    overlay: { backgroundColor: "#ffffff9f" },
                    content: {
                        maxWidth: "35rem",
                        height: "fit-content",
                        maxHeight: "90vh",
                        margin: "auto",
                        padding: "1rem",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }
                }}>
                {/* Add Note Component */}
                <AddNote close={() => setAddModal(false)} />
            </Modal>

            {/* Edit Note Modal */}
            <Modal
                isOpen={editModal}
                style={{
                    overlay: { backgroundColor: "#ffffff9f" },
                    content: {
                        maxWidth: "35rem",
                        height: "fit-content",
                        maxHeight: "90vh",
                        margin: "auto",
                        padding: "1rem",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }
                }}>
                {/* Edit Note Component */}
                <EditNote id={id} close={() => setEditModal(false)} createdAt={CreatedAt} />
            </Modal>

            {/* Delete Note Modal */}
            <Modal
                isOpen={deleteModal}
                style={{
                    overlay: { backgroundColor: "#ffffff9f", },
                    content: {
                        maxWidth: "32rem",
                        height: "fit-content",
                        margin: "auto",
                        padding: "1rem",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }
                }}>
                {/* Delete Note Component */}
                <DeleteNote id={id} deleteTitle={deleteTitle} createdAt={CreatedAt} close={() => setDeleteModal(false)} />
            </Modal>
        </div>
    )
}

export default Home