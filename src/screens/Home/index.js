import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestCreateTopic} from '../../actions/topic';
import {requestGetCategory} from '../../actions/category';
import HomeView from "./parts/HomeView";
import categoryReducer from "../../reducers/category";


class Home extends Component {
	constructor() {
		super();
		this.state = {
			dataSuccess: null,
		}
	}

	_onSubmitTopic(form) {
		let _this = this;
		this.props.createTopic(
			form,
			(data) => {
				_this.setState({
					dataSuccess: data
				});
			},
			(data_error) => {
				alert(data_error)
			},
		);
		console.log(form);
	}


	componentWillMount() {
		this.props.getCategory()
	}

	render() {
		console.log(this.props.dataCategory);
		return (
			<HomeView
				dataCategory={this.props.dataCategory}
				dataSuccess={this.state.dataSuccess}
				isLoading={this.props.isLoading}
				test="10"
				onSubmitTopic={(form) => this._onSubmitTopic(form)}
			/>
		);
	}

}

const mapStateToProps = state => ({
	data: state.topicsReducer.data,
	isLoading: state.topicsReducer.isLoading,
	dataCategory: state.categoryReducer.data
});

const mapDispatchToProps = dispatch => ({
	createTopic: (form, callbackSuccess, callbackError) => dispatch(requestCreateTopic(form, callbackSuccess, callbackError)),
	getCategory: () => dispatch(requestGetCategory()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
