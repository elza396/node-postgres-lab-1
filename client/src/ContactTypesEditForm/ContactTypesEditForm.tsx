import React, {useState} from 'react'
import {IContactType} from '../../../common/models'
import s from './ContactTypesEditForm.module.css'
import {projectApi} from '../index'

interface IProps {
    contactTypes: IContactType[]
    onCloseForm: () => void
    onDeleteType: (id: number) => void
    setTypes: (newTypes: IContactType[]) => void
}

export const ContactTypesEditForm = ({contactTypes: types, onCloseForm, onDeleteType, setTypes}: IProps) => {
    const [inputValue, setInputValue] = useState('')

    const deleteHandler = (id: number) => {
        onDeleteType(id)
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)
        try {
            const newContactType = await projectApi.createContactType(data)
            setTypes([...types, newContactType[0]])
            setInputValue('')
        } catch (error) {
            alert('Error create contact type')
        }
    }

    const onCloseHandler = () => {
        onCloseForm()
    }

    return (
        <div className={s.root}>
            <p>Contact Types</p>
            <div className={s.types}>
                {types.map(type => (
                    <div key={type.id} className={s.type}>
                        {type.name}
                        {!type.exists && (
                            <button className={s.button} onClick={() => deleteHandler(type.id)}>
                                x
                            </button>
                        )}
                    </div>
                ))}
                <form onSubmit={onSubmit} className={s.type}>
                    <input
                        className={s.input}
                        placeholder="Value"
                        name={'name'}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button>Save</button>
                </form>
            </div>

            <button className={s.closeButton} onClick={onCloseHandler}>
                x
            </button>
        </div>
    )
}
