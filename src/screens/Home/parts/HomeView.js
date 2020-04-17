import React, {Component} from 'react'
import {Form, Input, Button, Checkbox, Menu, Select, Collapse, Upload, Modal, message} from 'antd'
import {
	DownOutlined,
	UserOutlined,
	MinusCircleOutlined,
	PlusOutlined,
	SettingOutlined,
	UploadOutlined,
	InboxOutlined,
	LoadingOutlined
} from '@ant-design/icons'
import styles from './styles'
import {beforeUpload, getBase64} from "../../../utils/inputUtils";

const {Panel} = Collapse
const layout = {
	labelCol: {span: 3},
	wrapperCol: {span: 16},
}
const tailLayout = {
	wrapperCol: {offset: 8, span: 16},
}

const {Option} = Select



export default class HomeView extends Component {
	formRef = React.createRef()

	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			topicTitle: "",
			topicMeta: "",
			topicDescription: "",
			topicCategorySelected: null,
			topicImage: null,
			imageUrl: null,
			fileList: [],
			openPanel: [],
			previewVisible: false,
			topicCategory: [
				{"id": 1, "name": "1st menu item"},
				{"id": 2, "name": "2nd menu item"},
				{"id": 3, "name": "3rd menu item"},
			],
			topicQuestions: [
				{
					"title": "",
					"answers": [
						{
							"title": "",
							"isCorrect": false
						}
					]
				},
			]
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.dataSuccess && newProps.dataSuccess.id) {
			message.success('Create Topic Success!')

			this.formRef.current.resetFields()
			this.setState({
				topicQuestions: [
					{
						"title": "",
						"answers": [
							{
								"title": "",
								"isCorrect": false
							}
						]
					},
				]
			})
		}
	}

	handleChangeUpload = info => {
		if (info.file.status === 'uploading') {
			this.setState({loading: true})
			return
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
			)
		}
	}

	_onSubmitTopic() {
		const {
			topicTitle,
			topicMeta,
			topicDescription,
			topicCategorySelected,
			topicImage,
			imageUrl,
			topicQuestions
		} = this.state


		console.log(imageUrl)
		let form = {
			topicTitle,
			topicMeta,
			topicDescription,
			topicCategorySelected,
			topicImage,
			imageUrl,
			topicQuestions
		}
		this.props.onSubmitTopic(form)
	}

	render() {
		const {imageUrl} = this.state
		const {dataCategory, isLoading} = this.props
		const uploadButton = (
			<div>
				{this.state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
				<div className="ant-upload-text">Upload</div>
			</div>
		)
		return (
			<div style={styles.container}>
				<Form
					ref={this.formRef}
					{...layout}
					name="basic"
					onFinish={() => {
						this._onSubmitTopic()
					}}
				>
					<Form.Item
						label="Image"
						name="topicImage"
						rules={[{required: false, message: 'Please input image!'}]}
					>
						<Upload
							name="topicImage"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							beforeUpload={beforeUpload}
							onChange={this.handleChangeUpload}
						>
							{imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
						</Upload>
					</Form.Item>


					<Form.Item
						label="Title"
						name="topicTitle"
						rules={[{required: true, message: 'Please input title!'}]}
					>
						<Input disabled={isLoading}
							   onChange={(event) => this.handleChange('topicTitle', event.target.value)}/>
					</Form.Item>

					<Form.Item
						label="Meta Data"
						name="metadata"
						rules={[{required: true, message: 'Please input meta data!'}]}
					>
						<Input disabled={isLoading}
							   onChange={(event) => this.handleChange('topicMeta', event.target.value)}/>
					</Form.Item>

					<Form.Item
						name={['user', 'description']}
						label="Description"
						rules={[{required: true, message: 'Please input description!'}]}
					>
						<Input.TextArea
							disabled={isLoading}
							onChange={(event) => this.handleChange('topicDescription', event.target.value)}
						/>
					</Form.Item>

					<Form.Item
						name="topicCategory"
						label="Category"
						rules={[{required: true, message: 'Please choose category!'}]}
					>
						<Select
							placeholder="Please choose category"
							onChange={(value) => this.handleChange(value)}
							allowClear
							disabled={isLoading}
						>
							{dataCategory && dataCategory.length > 0 && dataCategory.map((item, index) => (
								<Option key={item.id} value={item.id}>{item.name}</Option>
							))}
						</Select>
					</Form.Item>


					{this.state.topicQuestions && this.state.topicQuestions.length > 0 &&
					<Collapse>
						{this.state.topicQuestions.map(
							(itemQuestion, indexQuestion) => (
								<Panel
									header={itemQuestion.title !== "" ? itemQuestion.title : "Please input question title!"}
									key={indexQuestion}
									extra={this.genExtra(indexQuestion)}>
									<Form.Item
										name={"questionTitle" + indexQuestion}
										label="Question Title"
										disabled={isLoading}
										rules={[{required: true, message: 'Please input question title!'}]}
									>
										<Input
											disabled={isLoading}
											rules={[{required: true, message: 'Please input title!'}]}
											placeholder="Question title"
											onChange={(value) => this._onChangeQuestionTitle(value, indexQuestion)}
										/>
									</Form.Item>
									{this.renderAnswerList(itemQuestion, indexQuestion)}
								</Panel>
							))}
					</Collapse>
					}
					<Form.Item style={styles.btnAddQuestion}>
						<Button
							disabled={isLoading}
							onClick={() => {
								this._addMoreQuestion()
							}}
						>
							Add more the question
						</Button>
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button
							type="primary"
							htmlType="submit"
							loading={this.props.isLoading}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}

	renderAnswerList = (questionData, questionIndex) => (
		<div>
			{questionData && questionData.answers.length > 0 && this.state.topicQuestions[questionIndex].answers.map((itemAnswer, answerIndex) => (
				<div key={answerIndex}>
					<Checkbox
						disabled={this.props.isLoading}
						checked={itemAnswer.isCorrect}
							  onChange={(event) => this._onChangeCorrectAnswer(answerIndex, questionIndex, event)}
							  name="isCorrect" style={styles.mb15}>Is correct</Checkbox>
					{(questionData.answers.length === 1 && answerIndex !== 0) || (questionData.answers.length > 1) &&
					<Button
						disabled={this.props.isLoading}
						onClick={() => {
							this._onDeleteAnswer(answerIndex, questionIndex)
						}}
					>
						<MinusCircleOutlined/> Delete answer
					</Button>
					}
					<Form.Item
						name={"answerTitle" + questionIndex + answerIndex}
						rules={[{
							required: true,
							message: 'Please input the answer'
						}]}
					>
						<Input placeholder={"The answer " + (answerIndex + 1)} onChange={(event) => {
							this._onChangeAnswerTitle(questionIndex, answerIndex, event)
						}}/>
					</Form.Item>
				</div>
			))}
			<Form.Item>
				<Button
					type="dashed"
					onClick={() => {
						this._addMoreAnswer(questionIndex)
					}}
					style={{width: "100%"}}
				>
					<PlusOutlined/> Add more the answer
				</Button>
			</Form.Item>
		</div>
	)

	handleChange = (name, value) => {
		this.setState({
			...this.state,
			[name]: value,
		})
	}

	genExtra = (indexQuestion) => (
		(this.state.topicQuestions.length === 1 && indexQuestion !== 0) || (this.state.topicQuestions.length > 1) &&
		<MinusCircleOutlined
			onClick={event => {
				this._onDeleteQuestion(indexQuestion)
			}}
		/>
	)

	_onDeleteQuestion(indexQuestion) {
		let questionListTmp = this.state.topicQuestions
		questionListTmp.splice(indexQuestion, 1)

		this.setState({
			topicQuestions: questionListTmp
		})
	}

	_onChangeQuestionTitle(event, index) {
		let questionListTmp = this.state.topicQuestions
		questionListTmp[index].title = event.target.value

		this.setState({
			topicQuestions: questionListTmp
		})
	}

	_onChangeAnswerTitle(questionIndex, answerIndex, event) {
		let questionListTmp = this.state.topicQuestions
		questionListTmp[questionIndex].answers[answerIndex].title = event.target.value

		this.setState({
			topicQuestions: questionListTmp
		})
	}

	_addMoreQuestion() {
		let questionListTmp = this.state.topicQuestions
		questionListTmp.push(
			{
				"title": "",
				"answers": [
					{
						"title": "",
						"isCorrect": false
					}
				]
			}
		)

		this.setState({
			topicQuestions: questionListTmp
		})
	}

	_addMoreAnswer(questionIndex) {
		let questionListTmp = this.state.topicQuestions
		questionListTmp[questionIndex].answers.push(
			{
				"title": "",
				"isCorrect": false
			}
		)

		this.setState({
			topicQuestions: questionListTmp
		})
	}

	_onDeleteAnswer(answerIndex, questionIndex) {
		let questionListTmp = this.state.topicQuestions
		questionListTmp[questionIndex].answers.splice(answerIndex, 1)

		this.setState({
			topicQuestions: questionListTmp
		})
	}

	_onChangeCorrectAnswer(answerIndex, questionIndex, event) {
		let questionListTmp = this.state.topicQuestions
		questionListTmp[questionIndex].answers[answerIndex].isCorrect = event.target.checked

		this.setState({
			topicQuestions: questionListTmp
		})
	}
}
