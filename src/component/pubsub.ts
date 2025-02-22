interface PubSub
    extends
        Record<"id", string>,
        Record<"service", 'libp2p-gossipsub' | "libp2p-pubsub" | "custom">,
        Record<"topics", string[]>,
        Partial<Record<"auth", Record<string, any>>>,
        Partial<Record<"properties", any>> {}