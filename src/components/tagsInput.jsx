import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";
import { getAvailableKeywordsData } from '../APIs/keywords';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(0.5, 0.25)
    }
}));

export default function TagsInput({ ...props }) {
    const classes = useStyles();
    const { selectedTags, placeholder, setFormData, keywordsGetByEnterClick, setKeywordsGetByEnterClick, selectedItem, setSelectedItem, ...other } = props;
    const [inputValue, setInputValue] = React.useState("");
    const [availableKeywords, setAvailableKeywords] = useState([]);
 
    

    const dispatch = useDispatch();

    // useEffect(() => {
    //     setSelectedItem(tags);
    // }, [tags]);

    useEffect(() => {
        selectedTags(selectedItem);
    }, [selectedItem, selectedTags]);


    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            console.log('in this 6')
            if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
                console.log('in this')
                return true;
            }
        }

        return false;
    }

    function handleKeyDown(event) {
        let newSelectedItem = [];
        let obj = { name: `#${event.target.value.trim()?.toLowerCase()}`, keyword_name: event.target.value?.replace(/ /g, '')?.replace('\n', '')?.toLowerCase() }
        if (event.key === "Enter") {
            if (selectedItem?.length >= 10) {
                setFormData(state => ({
                    ...state,
                    keywordsFieldValidation: true
                }))
            } else {
                setFormData(state => ({
                    ...state,
                    keywordsFieldValidation: false
                }))
                newSelectedItem = [...selectedItem];

                const duplicatedValues = containsObject(obj, selectedItem);

                // console.log(duplicatedValues, '684')

                if (duplicatedValues === true) {
                    setInputValue("");
                    return;
                }

                if (!event.target.value.replace(/\s/g, "").length) return;

                newSelectedItem = [...selectedItem, { name: `#${event.target.value.trim()?.toLowerCase()}`, keyword_name: event.target.value?.replace(/ /g, '')?.replace('\n', '')?.toLowerCase() }];

                setSelectedItem(newSelectedItem);
                setKeywordsGetByEnterClick([...keywordsGetByEnterClick, { name: `#${event.target.value.trim()?.toLowerCase()}`, keyword_name: event.target.value?.replace(/ /g, '')?.replace('\n', '')?.toLowerCase() }]);
                setInputValue("");
                setAvailableKeywords([]);
            }
        }
        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === "Backspace"
        ) {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    // function handleChange(item) {
    //     console.log(item,'itme')
    //     let newSelectedItem = [...selectedItem];
    //     if (newSelectedItem.indexOf(item) === -1) {
    //         newSelectedItem = [...newSelectedItem, { name: `#${item.trim()}`, keyword_name: item?.replace(/ /g, '')?.replace('\n','') }];
    //     }
    //     setInputValue("");
    //     setSelectedItem(newSelectedItem);
    //     setAllSelectedKeywords(newSelectedItem);
    // }

    const handleDelete = item => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
        if (containsObject(item, keywordsGetByEnterClick)) {
            handleDeleteKeywordByEnterClick(item)
        }
    };

    const handleDeleteKeywordByEnterClick = (obj) => {
        const newSelectedKeyByEnter = [...keywordsGetByEnterClick];
        const index = newSelectedKeyByEnter.findIndex(item => item.name === obj?.name);
        newSelectedKeyByEnter.splice(index, 1);
        setKeywordsGetByEnterClick(newSelectedKeyByEnter);
    };

    function handleInputChange(e) {
        const { name, value } = e.target;
        if (name === 'tags') {
            if (value !== '' || value !== undefined || value !== null) {
                setInputValue(value);
                dispatch(getAvailableKeywordsData({ keyword: value }, data => {
                    setAvailableKeywords(data?.data?.DBResponse)
                }))
            }
        }
    }

    const handleOnKeywordClick = (keywordName) => {
        if (selectedItem?.length >= 10) {
            setFormData(state => ({
                ...state,
                keywordsFieldValidation: true
            }))
        } else {
            setFormData(state => ({
                ...state,
                keywordsFieldValidation: false
            }))
            setAvailableKeywords([]);
            setInputValue('');
            setSelectedItem(state => ([
                ...state,
                { name: keywordName?.includes('#') ? `${keywordName.trim()?.toLowerCase()}` :`#${keywordName.trim()?.toLowerCase()}`, keyword_name: keywordName?.replace(/ /g, '')?.replace('\n', '')?.toLowerCase() }
            ]));
        }
    }


    // console.log(selectedItem, 'opo')

    // console.log(keywordsGetByEnterClick, 'kkl')

    return (
        <React.Fragment>
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                // onChange={handleChange}
                selectedItem={selectedItem?.map(res => res?.name)}
            >
                {({ getInputProps }) => {
                    const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                        onKeyDown: handleKeyDown,
                        placeholder
                    });
                    return (
                        <div>
                            <TextField
                                InputProps={{
                                    // startAdornment: selectedItem.map((item, index) => (

                                    //         <Chip
                                    //             key={index}
                                    //             tabIndex={-1}
                                    //             label={item?.name}
                                    //             className={classes.chip}
                                    //             onDelete={handleDelete(item)}
                                    //         />


                                    // )),
                                    onBlur,
                                    onChange: event => {
                                        handleInputChange(event);
                                        onChange(event);
                                    },
                                    onFocus
                                }}
                                {...other}
                                {...inputProps}
                            />

                            {availableKeywords?.length > 0 && <div className='absolute top-[34rem] z-10 bg-white w-auto drop-shadow px-1 rounded'>
                                <ul className='text-left'>
                                    {availableKeywords?.map((res, index) => (
                                        <li onClick={() => handleOnKeywordClick(res?.name)} className='text-sm my-1 px-2 py-1 rounded hover:bg-gray-100 hover:cursor-pointer' key={index}>{res?.name}</li>
                                    ))
                                    }
                                </ul>
                            </div>}
                            {selectedItem.map((item, index) => (
                                <Chip
                                    key={index}
                                    tabIndex={-1}
                                    label={item?.name}
                                    className={classes.chip}
                                    onDelete={() => handleDelete(item)}
                                />
                            ))}
                        </div>

                    );
                }}
            </Downshift>
        </React.Fragment>
    );
}
TagsInput.defaultProps = {
    tags: []
};
TagsInput.propTypes = {
    selectedTags: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
};
