// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useTreeStore = defineStore("tree", {
	state: () => ({
		items: [
			{
				id: 1,
				title: "Рубрики",
				children: [],
			},
		],
		selected: [],
		isAllowEmpty: false,
	}),
	getters: {
		countItems() {
			return this.items[0].children
				?.filter(i => {
					return this.selected.includes(i.id);
				})
				.reduce((acc, item) => {
					return acc + item.fullCount;
				}, 0);
		},
	},
	actions: {
		async loadRubrics() {
			try {
				const { data } = await axios.get(`https://www.klerk.ru/yindex.php/v3/event/rubrics${this.isAllowEmpty ? "?allowEmpty=1" : ""}`);
				this.items[0].children = data.map(i => {
					i.fullCount = i.count + i.children.reduce((acc, child) => acc + child.count, 0);
					i.title += ` - ${i.count} - ${i.fullCount}`;
					return i;
				});
				console.log(this.items, "123");
			} catch (e) {
				console.log(e, "Ошибка");
			}
		},
	},
});
