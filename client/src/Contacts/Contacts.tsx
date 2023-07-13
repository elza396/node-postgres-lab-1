import React, {useEffect, useState} from 'react'
import s from './Contacts.module.css'
import {projectApi} from '../index'
import {IContactType, IContact} from '../../../common/models'
import {ContactTypesEditForm} from '../ContactTypesEditForm/ContactTypesEditForm'

interface IProps {
    id: number
}

export const Contacts = (props: IProps) => {
    const [contacts, setContacts] = useState<IContact[]>([])
    const [contactTypes, setContactTypes] = useState<IContactType[]>([])
    const [isAddContactFormVisible, setIsAddContactFormVisible] = useState<boolean>(false)
    const [isContactTypesEditFormVisible, setIsContactTypesEditFormVisible] = useState<boolean>(false)

    const getContacts = async () => {
        try {
            const newContacts = await projectApi.getContactsById(props.id)
            setContacts(newContacts)
        } catch (error) {
            alert('Error load contact')
        }
    }

    const getContactTypes = async () => {
        try {
            const newContactTypes = await projectApi.getContactTypes()
            setContactTypes(newContactTypes)
        } catch (error) {
            alert('Error load contact types')
        }
    }

    const deleteHandler = async (id: number) => {
        try {
            await projectApi.deleteContact(id)
            await getContacts()
        } catch (error) {
            alert('Error delete person')
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = new FormData(e.target as HTMLFormElement)
            await projectApi.createContact(data)
            await getContacts()
            setIsAddContactFormVisible(false)
        } catch (error) {
            alert('Error create contact')
        }
    }

    const onDeleteContactType = async (id: number) => {
        try {
            await projectApi.deleteContactType(id)
            setContactTypes(contactTypes.filter(type => type.id !== id))
        } catch (error) {
            alert('Error delete contact type')
        }
    }

    const editButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsContactTypesEditFormVisible(true)
    }

    useEffect(() => {
        void getContacts()
        void getContactTypes()
    }, [])

    return (
        <div className={s.contacts}>
            {contacts.length < 1 ? (
                <div className={s.contact}>Нет данных</div>
            ) : (
                contacts.map(contact => (
                    <div key={contact.id} className={s.contact}>
                        <p>{contact.name}</p>
                        <p>{contact.value}</p>
                        <div className={s.buttons}>
                            <button className={s.button} onClick={() => deleteHandler(contact.id)}>
                                x
                            </button>
                        </div>
                    </div>
                ))
            )}

            {isAddContactFormVisible ? (
                <form onSubmit={onSubmit} className={s.contact}>
                    <input hidden name={'personId'} value={props.id} />
                    <label>
                        <span>Type: </span>
                        <select name="contacttypeId">
                            {contactTypes.map(ctype => (
                                <option key={ctype.id} value={ctype.id}>
                                    {ctype.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        className={s.button}
                        onClick={e => {
                            editButtonHandler(e)
                            void getContactTypes()
                        }}>
                        Edit Types
                    </button>
                    <input className={s.input} placeholder="Value" name={'value'} />
                    <button>Save</button>
                </form>
            ) : (
                <button className={s.button} onClick={() => setIsAddContactFormVisible(true)}>
                    Add contact
                </button>
            )}
            {isContactTypesEditFormVisible && (
                <ContactTypesEditForm
                    contactTypes={contactTypes}
                    onDeleteType={id => onDeleteContactType(id)}
                    onCloseForm={() => setIsContactTypesEditFormVisible(false)}
                    setTypes={newTypes => setContactTypes(newTypes)}
                />
            )}
        </div>
    )
}
