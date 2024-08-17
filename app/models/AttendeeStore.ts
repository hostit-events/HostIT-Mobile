import { api, fetchApi } from "app/services/api";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";

const AttendeeModel = types.model("Attendee", {
    id: types.number,
    name: types.string,
    email: types.string,
    phone: types.string,
    country: types.string,
    location: types.string,
    gender: types.string,
    telegramusername: types.string,
    xhandle: types.string,
    role: types.string,
});

export const AttendeesStoreModel = types
    .model("AttendeesStore")
    .props({
        attendees: types.optional(types.array(AttendeeModel), []),
        filteredAttendees: types.optional(types.array(types.array(types.string)), []),
        fetchingStatus: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    })
    .views((store) => ({
        get allAttendees() {
            return store.attendees;
        },
        get totalAttendees() {
            return store.attendees.length;
        },
        get filteredData() {
            return store.filteredAttendees;
        },
        get totalFilteredData() {
            return store.filteredAttendees.length;
        }
    }))
    .actions((store) => ({
        fetchAllAttendees: flow(function* () {
            store.fetchingStatus = "pending";
            try {
                const response = yield fetchApi.apisauce.get("api/general-registrations/");
                if (response.ok && response.data) {
                    store.attendees = response.data.map((item: any) => AttendeeModel.create(item));
                    store.fetchingStatus = "done";
                } else {
                    console.error("Error fetching data:", response.problem);
                    store.fetchingStatus = "error";
                }
            } catch (error) {
                console.error("Error:", error);
                store.fetchingStatus = "error";
            }
        }),

        fetchTableData: flow(function* () {
            store.fetchingStatus = "pending";
            try {
                const response = yield api.apisauce.get("api/attendance");
                if (response.ok && response.data) {
                    const userData = response.data.data;
                    const today = new Date().toISOString().split("T")[0];
                    const filteredData = userData.filter((user: any) => user.createdAt.startsWith(today));
                    store.filteredAttendees = filteredData.map((obj: { email: any; createdAt: any }, index: number) => [
                        JSON.stringify(index + 1),
                        obj.email,
                        obj.createdAt.slice(11, 19),
                    ]);
                    store.fetchingStatus = "done";
                } else {
                    console.error("Error fetching data:", response.problem);
                    store.fetchingStatus = "error";
                }
            } catch (error) {
                console.error("Error:", error);
                store.fetchingStatus = "error";
            }
        }),

        clearAttendees() {
            store.attendees.clear();
            store.filteredAttendees.clear();
            store.fetchingStatus = "idle";
        },
    }))
    .actions((store) => ({
        afterCreate() {
            store.fetchAllAttendees(); 
            store.fetchTableData()
        },
    }));

export interface AttendeesStore extends Instance<typeof AttendeesStoreModel> {}
export interface AttendeesStoreSnapshot extends SnapshotOut<typeof AttendeesStoreModel> {}
