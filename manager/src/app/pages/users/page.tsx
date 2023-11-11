'use client'
import { showAlert } from '@/component/utils/alert/alert';
import { AppDispatch } from '@/redux-store/store';
import { createUserListAsync, deleteUserAsync, getStatusUserState, getUserList, getUserListAsync, searchUserAsync } from '@/redux-store/user-reducer/userSlice';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default function User() {
    const dispatch: AppDispatch = useDispatch();
    const userList: any = useSelector(getUserList);
    const status: any = useSelector(getStatusUserState);
    const [users, setUsers] = useState<any[]>([]);
    const [modal1, setModal1] = useState(false);
    const [isAdd, setisAdd] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birtDay, setBirtDay] = useState("");
    const [idUser, setIdUser] = useState("");
    const [image, setImage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [file, setFile] = useState<File>()
    const [searchName, setSearchName] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const role = 'user';

    const toggle1 = () => setModal1(!modal1);
    const openModal1 = () => {
        toggle1();
    }

    useEffect(() => {
        dispatch(getUserListAsync(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (userList && userList.data) {
            setUsers(userList.data);
        }
    }, [userList]);

    const totalPages = userList?.totalPages || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        dispatch(getUserListAsync(page));
    };

    const handleAddUser = async () => {
        const user = {
            idUser,
            username,
            password,
            name,
            role,
            phoneNumber,
            email,
            address,
            birtDay,
            file
        }

        await dispatch(createUserListAsync(user));
        if (status == 'idle') {
            showAlert("success", "Thêm nhân viên mới thành công ");
            dispatch(getUserListAsync(currentPage));
            openModal1();
            setDataForm("");
            setIsEdit(false);
        } else {
            showAlert("error", "Thêm nhân viên mới  bại ");
        }
    }
    const setDataForm = (item: any) => {

        if (item) {
            setUsername(item.username);
            setPassword(item.password);
            setName(item.name);
            setPhoneNumber(item.phoneNumber);
            setEmail(item.email);
            setAddress(item.address);
            setBirtDay(item.birtDay);
            setIdUser(item.id);
            setIsEdit(true);
            setImage(item.imgUrl)
        } else {
            setUsername("");
            setPassword("");
            setName("");
            setPhoneNumber("");
            setEmail("");
            setAddress("");
            setBirtDay("");
            setIdUser("");
            setImage("")
        }
    }
    const onSearchChange = (searchName: any) => {
        setSearchName(searchName);
        if (searchName.trim() !== '') {
            dispatch(searchUserAsync(searchName));
        } else {
            handlePageChange(currentPage)
        }
    }
    const handleChangeFile = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImage = event.target.files[0];
            setFile(selectedImage);
        }
    }

    const handleDeleteUser = (id: any) => {

        dispatch(deleteUserAsync(id));
        if (status == 'idle') {
            showAlert("success", "Xoá nhân viên mới thành công ");
            dispatch(getUserListAsync(currentPage));
        } else {
            showAlert("error", "Xoá nhân viên mới  bại ");
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="p-3" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid rgb(195 211 210)' }}>
                    <h3 className='m-0' style={{ height: '40px' }}>Danh sách nhân viên</h3>
                    <button className="btn btn-success" onClick={() => {
                        openModal1();
                        setIsEdit(false);
                    }}><i className="fas fa-plus-circle mx-0"></i>Thêm nhân viên</button>
                </div>
            </div>

            <div className="content m-3 row" style={{ display: 'flex', alignItems: 'center' }}>
                <h6 className='col-sm-1 m-0'>Tìm kiếm:</h6>
                <form role="search" className='col-sm-11'>
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Tìm kiếm nhân viên..."
                        className='form-control'
                    />
                </form>
            </div>
            <div className="card card-body border-0 p-0 mx-3" style={{ height: '72vh', overflowY: 'auto' }}>
                <table className="table table-striped projects">
                    <thead>
                        <tr>
                            <th style={{ width: "5vh" }}>
                                MNV
                            </th>
                            <th style={{ width: "30vh" }}>
                                Tên nhân viên
                            </th>
                            <th style={{ width: "20vh" }}>
                                Tên đăng nhập
                            </th>
                            <th style={{ width: "20vh" }}>
                                SĐT
                            </th>
                            <th style={{ width: "30vh" }}>
                                Email
                            </th>
                            <th style={{ width: "15vh" }} className="text-center">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? users.map((item: any, i: number) => (
                            <tr key={item && item.id ? item.id : null}>
                                <td>
                                    {item && item.id ? item.id : "Chưa xác định"}
                                </td>
                                <td>
                                    <a>
                                        {item && item.name ? item.name : "Chưa xác định"}
                                    </a>
                                    <br />
                                </td>
                                <td>
                                    {/* <img alt="user" style={{ width: 60, height: 60 }} src={item && item.imgUrl ? item.imgUrl : ""} /> */}
                                    {item && item.username ? item.username : "Chưa xác định"}
                                </td>
                                <td className="project_progress">
                                    {item && item.phoneNumber ? item.phoneNumber : "Chưa xác định"}
                                </td>
                                <td className="project_progress">
                                    {item && item.email ? item.email : "Chưa xác định"}
                                </td>
                                <td className="project-actions text-right">
                                    <div className="d-flex justify-content-between " >
                                        <button className="btn btn-success btn-sm pd-5" onClick={() => {
                                            openModal1();
                                            setDataForm(item);
                                            setIsEdit(true);
                                        }}>
                                            <i className="fas fa-pencil-alt"></i>
                                            Sửa
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => {
                                            handleDeleteUser(item.id)
                                        }}>
                                            <i className="fas fa-trash"></i> Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : ""}
                    </tbody>
                </table>
            </div>
            <Modal size='lg' isOpen={modal1} toggle1={openModal1} style={{ backgroundColor: 'red' }}>
                <ModalHeader toggle1={openModal1}>{isEdit == false ? 'Thêm nhân viên mới' : 'Chỉnh sửa thông tin nhân viên'}</ModalHeader>
                <ModalBody>
                    <form className="form-horizontal row d-flex justify-content-between" >
                        <div className='col-sm-5'>
                            <div className="form-group row" style={{display: 'flex', border: '1px solid gray', justifyContent: 'center', padding: '10px', borderRadius: '20px'}}>
                                {/* <label className="col-sm-4 col-form-label">Ảnh đại diện</label> */}
                                <img src={image ? image : '/img/user.png'} alt="" style={{ width: '200px', height:'200px', borderRadius: '20px'}} />
                                <div className="col-sm-8">
                                    <input
                                        className="form-control mt-2"
                                        type='file'
                                        id="image"
                                        onChange={handleChangeFile}
                                    />
                                </div>
                            </div>
                            <div className="form-group row" style={{display: 'flex', justifyContent: 'center'}}>
                                {/* <label className="col-sm-4 col-form-label">Tên nhân viên</label> */}
                                <div className="col-sm-8">
                                    <input
                                        className="form-control p-0"
                                        style={{fontSize: '20px', fontWeight: 'bold', textAlign:'center', }}
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-7 px-5'>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Tên tài khoản</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Số điện thoại</label>
                                <div className="col-sm-8">

                                    <input
                                        className="form-control"
                                        id="name"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            {isEdit && isEdit === true ? <>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Email</label>
                                    <div className="col-sm-8">

                                        <input
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />


                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Địa chỉ</label>
                                    <div className="col-sm-8">

                                        <input
                                            className="form-control"
                                            id="address"
                                            value={address}
                                            onChange={(e) => {
                                                setAddress(e.target.value)
                                            }}
                                        />


                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Sinh nhật</label>
                                    <div className="col-sm-8">

                                        <input
                                            className="form-control"
                                            id="birthDay"
                                            value={birtDay}
                                            onChange={(e) => {
                                                setBirtDay(e.target.value)
                                            }}
                                        />


                                    </div>
                                </div>
                            </> : ""}
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddUser}>
                        Lưu
                    </Button>
                    <Button color="secondary" onClick={() => {
                        openModal1();
                        setDataForm(null);
                    }}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>
            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &#60;
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li
                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                            key={i + 1}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            &#62;
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}