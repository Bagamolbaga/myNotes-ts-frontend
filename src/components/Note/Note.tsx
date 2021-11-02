import React, { FC, useState } from 'react';
import QuillEditor from '../QuillEditor';
import GroupItem from '../SideBar/GroupItem/GroupItem';
import s from './Note.module.scss';
import './QuillRoot.scss'

const Note: FC = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [showChangeModal, setShowChangeModal] = useState(false);

	const closeModalHandler = (e: React.MouseEvent) => {
		showOptions && setShowOptions(false);
	};

	const toggleModalHandler = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowOptions(!showOptions);
	};

	const closeChangeGroupModalHandler = (e: React.MouseEvent) => {
		e.stopPropagation();
		showChangeModal && setShowChangeModal(false);
	};

	const openChangeGroupModalHandler = (e: React.MouseEvent) => {
		e.stopPropagation();
		showOptions && setShowOptions(false);
		!showChangeModal && setShowChangeModal(true);
	};

	const stopPropagationEvent = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<>
			{showChangeModal && (
				<div
					className={s.changeGroupModalContainer}
					onClick={closeChangeGroupModalHandler}>
					<div className={s.changeGroupModal} onClick={stopPropagationEvent}>
						<p>Select new group</p>
						<GroupItem showSideBar={false} color="#d83030" label="Game" />
						<GroupItem showSideBar={false} color="#1ed116" label="IT" />
						<GroupItem showSideBar={false} color="#2bc5d5" label="Anime" />
						<GroupItem showSideBar={false} color="#c42bc5" label="Gachi" />
					</div>
				</div>
			)}
			<div className={s.container} onClick={closeModalHandler}>
				{showOptions && (
					<div
						className={s.optionsModalContainer}
						onClick={stopPropagationEvent}>
						<div className={s.optionsItemContainer}>
							<div className={s.iconContainer}>
								<i className="far fa-heart"></i>
							</div>
							<p>Add to favorites</p>
						</div>
						<div className={s.optionsItemContainer}>
							<div className={s.iconContainer}>
								<i className="fas fa-thumbtack"></i>
							</div>
							<p>Pin note</p>
						</div>
						<div className={s.optionsItemContainer}>
							<div className={s.iconContainer}>
								<i className="far fa-edit"></i>
							</div>
							<p>Edit note</p>
						</div>
						<div className={s.optionsItemContainer}>
							<div className={s.iconContainer}>
								<i className="far fa-copy"></i>
							</div>
							<p>Copy note</p>
						</div>
						<div
							className={s.optionsItemContainer}
							onClick={openChangeGroupModalHandler}>
							<div className={s.iconContainer}>
								<i className="far fa-folder"></i>
							</div>
							<p>Change group</p>
						</div>
						<div className={s.optionsItemContainer}>
							<div className={s.iconContainer}>
								<i className="far fa-trash-alt"></i>
							</div>
							<p>Delete note</p>
						</div>
					</div>
				)}
				<div className={s.headerContainer}>
					<div className={s.selectAndInputTagsContainer}>
						<div className={s.selectGroup}>
							<i className="far fa-folder" style={{ color: 'red' }}></i>
							<p className="groupLabel">Anime</p>
							<i className={`fas fa-sort-down ${s.arrow}`}></i>
						</div>
						<div className={s.inputTagsContainer}>
							<i className="fas fa-hashtag"></i>
							<input placeholder="Add tags" type="text" name="tags" id="" />
						</div>
					</div>
					<div className={s.optionsContainer} onClick={toggleModalHandler}>
						<div className={s.options}>
							<i className="fas fa-ellipsis-h"></i>
						</div>
					</div>
				</div>
				<div className={s.noteContainer}>
					<div className={s.noteHeader}>
						<img
							src="https://i.pinimg.com/originals/c5/57/04/c55704fa7c9795fc439cb47246d30e27.jpg"
							alt=""
						/>
						<div className={s.noteHeaderInfo}>
							<div className={s.groupCircle}></div>
							<h1 className={s.noteTitle}>Title</h1>
						</div>
					</div>
					<QuillEditor value='adad' />
				</div>
			</div>
		</>
	);
};

export default Note;
