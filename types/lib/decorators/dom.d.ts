interface DomInterface {
    tag?: string;
    class?: string;
    event_code?: string;
    autoGenerate?: boolean;
}
export declare function dom(values: DomInterface): (target: any) => void;
export {};
